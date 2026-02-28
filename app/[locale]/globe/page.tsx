"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import dynamic from "next/dynamic"
import "maplibre-gl/dist/maplibre-gl.css"
import { useTranslations } from "next-intl"
import { Globe, ArrowLeft } from "lucide-react"
import { Link } from "@/i18n/navigation"
import CategoryFilter from "@/components/globe/CategoryFilter"
import GlobeStats from "@/components/globe/GlobeStats"
import MarketPopup from "@/components/globe/MarketPopup"
import TradeFeed from "@/components/globe/TradeFeed"
import type { GlobeMapHandle } from "@/components/globe/GlobeMap"
import type {
  GlobeCategory,
  GlobeMarketFeature,
  GlobeTrade,
} from "@/lib/globe-data"
import {
  MOCK_TRADES,
  MOCK_GLOBE_STATS,
  COUNTRY_COORDS,
  GLOBE_MARKETS,
} from "@/lib/globe-data"
import type { GlobeBeam } from "@/lib/globe-beam"
import { createBeam, getBeamProgress } from "@/lib/globe-beam"

const GlobeMap = dynamic(() => import("@/components/globe/GlobeMap"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-white/20 border-t-[#00ff88] rounded-full animate-spin mx-auto mb-4" />
        <span className="text-white/40 text-xs font-mono">INITIALIZING GLOBE...</span>
      </div>
    </div>
  ),
})

const MAX_BEAMS = 10
const BEAM_COLOR_YES = "#00ff88"
const BEAM_COLOR_NO = "#ff4466"

function pickRandomTrade(): GlobeTrade {
  return MOCK_TRADES[Math.floor(Math.random() * MOCK_TRADES.length)]
}

function pickRandomMarketCoords(): [number, number] {
  const features = GLOBE_MARKETS.features
  const feature = features[Math.floor(Math.random() * features.length)]
  return feature.geometry.coordinates
}

export default function GlobePage() {
  const t = useTranslations("globe")
  const globeRef = useRef<GlobeMapHandle>(null)
  const [category, setCategory] = useState<GlobeCategory>("all")
  const [selectedMarket, setSelectedMarket] = useState<GlobeMarketFeature | null>(null)
  const [beams, setBeams] = useState<GlobeBeam[]>([])

  // Periodic beam launcher (2~4s random interval)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const launchBeam = () => {
      const trade = pickRandomTrade()
      const targetCoords = COUNTRY_COORDS[trade.country]
      if (!targetCoords) {
        scheduleNext()
        return
      }

      const fromCoords = pickRandomMarketCoords()

      // Skip if from/to are identical
      if (fromCoords[0] === targetCoords[0] && fromCoords[1] === targetCoords[1]) {
        scheduleNext()
        return
      }

      const color = trade.type === "YES" ? BEAM_COLOR_YES : BEAM_COLOR_NO
      const beam = createBeam(fromCoords, targetCoords, color)

      setBeams((prev) => {
        const next = [...prev, beam]
        return next.length > MAX_BEAMS ? next.slice(next.length - MAX_BEAMS) : next
      })

      scheduleNext()
    }

    const scheduleNext = () => {
      const delay = 800 + Math.random() * 1200
      timeout = setTimeout(launchBeam, delay)
    }

    scheduleNext()

    return () => clearTimeout(timeout)
  }, [])

  // Expired beam cleanup (every 1s)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setBeams((prev) => {
        const filtered = prev.filter((b) => !getBeamProgress(b, now).isExpired)
        return filtered.length === prev.length ? prev : filtered
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleMarketClick = useCallback((market: GlobeMarketFeature) => {
    setSelectedMarket(market)
  }, [])

  const handleMarketHover = useCallback((_market: GlobeMarketFeature | null) => {}, [])

  const handleTradeClick = useCallback(
    (trade: GlobeTrade) => {
      const coords = COUNTRY_COORDS[trade.country]
      if (coords && globeRef.current) {
        globeRef.current.flyTo(coords[0], coords[1], 4)
      }
    },
    []
  )

  const handleClosePopup = useCallback(() => {
    setSelectedMarket(null)
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black font-mono">
      {/* Header */}
      <div
        className="absolute top-0 left-0 right-0 z-20 px-4 py-3"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t("back")}</span>
            </Link>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#00d4ff]" />
              <h1 className="text-sm font-bold text-white tracking-wider">
                KIMBAP GLOBE
              </h1>
            </div>
            <span className="px-2 py-0.5 bg-green-900/40 border border-green-500/30 rounded text-green-400 text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="absolute top-14 left-4 z-20">
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>

      {/* Globe Map */}
      <GlobeMap
        ref={globeRef}
        category={category}
        beams={beams}
        onMarketClick={handleMarketClick}
        onMarketHover={handleMarketHover}
      />

      {/* Trade Feed (right side) */}
      <div className="absolute top-14 right-4 bottom-16 z-10 hidden md:block">
        <TradeFeed trades={MOCK_TRADES} onTradeClick={handleTradeClick} />
      </div>

      {/* Stats (bottom left) */}
      <div className="absolute bottom-4 left-4 z-10">
        <GlobeStats stats={MOCK_GLOBE_STATS} />
      </div>

      {/* Market Popup (bottom center) */}
      {selectedMarket && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
          <MarketPopup market={selectedMarket} onClose={handleClosePopup} />
        </div>
      )}
    </div>
  )
}
