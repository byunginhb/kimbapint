"use client"

import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react"
import type { Map as MapLibreMapType, GeoJSONSource } from "maplibre-gl"
import type {
  GlobeCategory,
  GlobeMarketFeature,
  GlobeMarketGeoJSON,
  GlobeMarketStatus,
  GlobeMarketCategory,
} from "@/lib/globe-data"
import { buildFilteredGeoJSON } from "@/lib/globe-data"
import type { GlobeBeam } from "@/lib/globe-beam"
import { beamsToTrailGeoJSON, beamsToHeadGeoJSON } from "@/lib/globe-beam"

export interface GlobeMapHandle {
  flyTo: (lng: number, lat: number, zoom?: number) => void
}

interface GlobeMapProps {
  category: GlobeCategory
  beams: readonly GlobeBeam[]
  onMarketClick: (market: GlobeMarketFeature) => void
  onMarketHover: (market: GlobeMarketFeature | null) => void
}

const IDLE_TIMEOUT_MS = 30_000
const INITIAL_CENTER: [number, number] = [127, 37]
const INITIAL_ZOOM = 1.5
const AUTO_ROTATE_SPEED = 0.03
const MIN_CLICK_ZOOM = 3
const FLY_TO_DURATION_MS = 1200
const MIN_VOLUME = 500_000
const MAX_VOLUME = 15_000_000

const EMPTY_FC: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [],
}

function reconstructFeature(
  rawFeature: GeoJSON.Feature
): GlobeMarketFeature {
  const props = rawFeature.properties ?? {}
  const geom = rawFeature.geometry as GeoJSON.Point
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: geom.coordinates as [number, number],
    },
    properties: {
      id: String(props.id),
      title: String(props.title),
      probability: Number(props.probability),
      volume: Number(props.volume),
      status: props.status as GlobeMarketStatus,
      category: props.category as GlobeMarketCategory,
      country: String(props.country),
      countryCode: String(props.countryCode),
      lastTradeAt: String(props.lastTradeAt),
    },
  }
}

const GlobeMap = forwardRef<GlobeMapHandle, GlobeMapProps>(
  function GlobeMap({ category, beams, onMarketClick, onMarketHover }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<MapLibreMapType | null>(null)
    const autoRotateRef = useRef<number | null>(null)
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isRotatingRef = useRef(false)
    const mapReadyRef = useRef(false)

    // CRITICAL-1: Stable callback refs to avoid stale closure
    const onMarketClickRef = useRef(onMarketClick)
    const onMarketHoverRef = useRef(onMarketHover)

    useEffect(() => {
      onMarketClickRef.current = onMarketClick
    }, [onMarketClick])

    useEffect(() => {
      onMarketHoverRef.current = onMarketHover
    }, [onMarketHover])

    const startAutoRotate = useCallback(() => {
      if (!mapRef.current || isRotatingRef.current) return
      isRotatingRef.current = true

      const rotate = () => {
        const map = mapRef.current
        if (!map || !isRotatingRef.current) return
        const center = map.getCenter()
        map.setCenter([center.lng + AUTO_ROTATE_SPEED, center.lat])
        autoRotateRef.current = requestAnimationFrame(rotate)
      }
      autoRotateRef.current = requestAnimationFrame(rotate)
    }, [])

    const stopAutoRotate = useCallback(() => {
      isRotatingRef.current = false
      if (autoRotateRef.current !== null) {
        cancelAnimationFrame(autoRotateRef.current)
        autoRotateRef.current = null
      }
    }, [])

    const resetIdleTimer = useCallback(() => {
      stopAutoRotate()
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(startAutoRotate, IDLE_TIMEOUT_MS)
    }, [startAutoRotate, stopAutoRotate])

    useImperativeHandle(ref, () => ({
      flyTo: (lng: number, lat: number, zoom = 4) => {
        stopAutoRotate()
        mapRef.current?.flyTo({ center: [lng, lat], zoom, duration: 1500 })
        resetIdleTimer()
      },
    }))

    // Update filtered data when category changes (HIGH-3: guard with mapReady)
    useEffect(() => {
      if (!mapReadyRef.current || !mapRef.current) return

      const source = mapRef.current.getSource("markets") as GeoJSONSource | undefined
      if (source) {
        source.setData(buildFilteredGeoJSON(category) as unknown as GeoJSON.GeoJSON)
      }
    }, [category])

    // Beam animation loop — only active when beams exist
    useEffect(() => {
      if (beams.length === 0) {
        if (mapReadyRef.current && mapRef.current) {
          const trailSource = mapRef.current.getSource("beam-trails") as GeoJSONSource | undefined
          const headSource = mapRef.current.getSource("beam-heads") as GeoJSONSource | undefined
          trailSource?.setData(EMPTY_FC)
          headSource?.setData(EMPTY_FC)
        }
        return
      }

      let rafId: number

      const animate = () => {
        const map = mapRef.current
        if (!map || !mapReadyRef.current) {
          rafId = requestAnimationFrame(animate)
          return
        }

        const now = Date.now()
        const trailSource = map.getSource("beam-trails") as GeoJSONSource | undefined
        const headSource = map.getSource("beam-heads") as GeoJSONSource | undefined

        if (trailSource && headSource) {
          trailSource.setData(beamsToTrailGeoJSON(beams, now))
          headSource.setData(beamsToHeadGeoJSON(beams, now))
        }

        rafId = requestAnimationFrame(animate)
      }

      rafId = requestAnimationFrame(animate)

      return () => cancelAnimationFrame(rafId)
    }, [beams])

    // Initialize MapLibre
    useEffect(() => {
      if (!containerRef.current) return

      let map: MapLibreMapType
      let destroyed = false

      const init = async () => {
        const { Map: MapLibreMap } = await import("maplibre-gl")

        if (destroyed || !containerRef.current) return

        map = new MapLibreMap({
          container: containerRef.current,
          zoom: INITIAL_ZOOM,
          center: INITIAL_CENTER,
          pitch: 0,
          canvasContextAttributes: { antialias: true },
          style: {
            version: 8,
            projection: { type: "globe" },
            sources: {
              satellite: {
                tiles: [
                  "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg",
                ],
                type: "raster",
                tileSize: 256,
              },
            },
            layers: [
              {
                id: "satellite",
                type: "raster",
                source: "satellite",
                paint: {
                  "raster-brightness-min": 0.03,
                  "raster-brightness-max": 0.4,
                  "raster-contrast": 0.5,
                  "raster-saturation": -0.6,
                },
              },
            ],
            sky: {
              "atmosphere-blend": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 1,
                5, 1,
                7, 0,
              ],
            },
            light: {
              anchor: "map",
              position: [1.5, 90, 80],
            },
          },
        })

        mapRef.current = map

        map.on("style.load", () => {
          if (destroyed) return

          const geojson: GlobeMarketGeoJSON = buildFilteredGeoJSON(category)

          map.addSource("markets", {
            type: "geojson",
            data: geojson as unknown as GeoJSON.GeoJSON,
          })

          // Beam sources
          map.addSource("beam-trails", {
            type: "geojson",
            data: EMPTY_FC,
          })

          map.addSource("beam-heads", {
            type: "geojson",
            data: EMPTY_FC,
          })

          // Beam trail glow (wide, blurred outer)
          map.addLayer({
            id: "beam-trail-glow",
            type: "line",
            source: "beam-trails",
            paint: {
              "line-color": ["get", "color"],
              "line-width": 6,
              "line-blur": 3,
              "line-opacity": ["*", 0.3, ["get", "opacity"]],
            },
          })

          // Beam trail core (thin, bright)
          map.addLayer({
            id: "beam-trail-core",
            type: "line",
            source: "beam-trails",
            paint: {
              "line-color": ["get", "color"],
              "line-width": 2,
              "line-opacity": ["*", 0.8, ["get", "opacity"]],
            },
          })

          // Pulse halo for hot markets
          map.addLayer({
            id: "market-pulse",
            type: "circle",
            source: "markets",
            filter: ["==", ["get", "status"], "hot"],
            paint: {
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["get", "volume"],
                MIN_VOLUME, 10,
                MAX_VOLUME, 30,
              ],
              "circle-color": "#ff4444",
              "circle-opacity": [
                "interpolate",
                ["linear"],
                ["get", "volume"],
                MIN_VOLUME, 0.15,
                MAX_VOLUME, 0.25,
              ],
              "circle-blur": 1,
            },
          })

          // Market circle points
          map.addLayer({
            id: "market-points",
            type: "circle",
            source: "markets",
            paint: {
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["get", "volume"],
                MIN_VOLUME, 6,
                MAX_VOLUME, 20,
              ],
              "circle-color": [
                "match",
                ["get", "status"],
                "active", "#00ff88",
                "hot", "#ff4444",
                "resolved", "#666666",
                "#00ff88",
              ],
              "circle-opacity": 0.85,
              "circle-stroke-width": 1.5,
              "circle-stroke-color": [
                "match",
                ["get", "status"],
                "active", "rgba(0,255,136,0.4)",
                "hot", "rgba(255,68,68,0.4)",
                "resolved", "rgba(102,102,102,0.4)",
                "rgba(0,255,136,0.4)",
              ],
            },
          })

          // Beam head glow (large, soft)
          map.addLayer({
            id: "beam-head-glow",
            type: "circle",
            source: "beam-heads",
            paint: {
              "circle-radius": 12,
              "circle-color": ["get", "color"],
              "circle-blur": 1,
              "circle-opacity": ["*", 0.5, ["get", "opacity"]],
            },
          })

          // Beam head core (small, bright)
          map.addLayer({
            id: "beam-head-core",
            type: "circle",
            source: "beam-heads",
            paint: {
              "circle-radius": 4,
              "circle-color": ["get", "color"],
              "circle-opacity": ["get", "opacity"],
            },
          })

          // Hover effect — uses ref to avoid stale closure
          map.on("mouseenter", "market-points", (e) => {
            map.getCanvas().style.cursor = "pointer"
            if (e.features?.[0]) {
              onMarketHoverRef.current(reconstructFeature(e.features[0]))
            }
          })

          map.on("mouseleave", "market-points", () => {
            map.getCanvas().style.cursor = ""
            onMarketHoverRef.current(null)
          })

          // Click handler — uses ref to avoid stale closure
          map.on("click", "market-points", (e) => {
            if (e.features?.[0]) {
              const feature = reconstructFeature(e.features[0])
              onMarketClickRef.current(feature)

              map.flyTo({
                center: feature.geometry.coordinates,
                zoom: Math.max(map.getZoom(), MIN_CLICK_ZOOM),
                duration: FLY_TO_DURATION_MS,
              })
              resetIdleTimer()
            }
          })

          mapReadyRef.current = true
        })

        // User interaction listeners
        const interactionEvents = [
          "mousedown",
          "touchstart",
          "wheel",
        ] as const
        interactionEvents.forEach((evt) => {
          map.on(evt, resetIdleTimer)
        })

        // Start idle timer
        idleTimerRef.current = setTimeout(startAutoRotate, IDLE_TIMEOUT_MS)
      }

      init()

      return () => {
        destroyed = true
        mapReadyRef.current = false
        stopAutoRotate()
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
        map?.remove()
        mapRef.current = null
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          background: "#000",
        }}
      />
    )
  }
)

export default GlobeMap
