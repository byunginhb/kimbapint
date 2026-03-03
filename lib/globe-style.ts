import type {
  StyleSpecification,
  SkySpecification,
  LightSpecification,
  ProjectionSpecification,
} from "maplibre-gl"

const CARTO_DARK_MATTER_URL =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"

const GLOBE_PROJECTION: ProjectionSpecification = { type: "globe" }

const GLOBE_SKY: SkySpecification = {
  "atmosphere-blend": [
    "interpolate",
    ["linear"],
    ["zoom"],
    0, 1,
    5, 1,
    7, 0,
  ] as SkySpecification["atmosphere-blend"],
}

const GLOBE_LIGHT: LightSpecification = {
  anchor: "viewport",
  position: [1.5, 0, 80],
}

const FALLBACK_STYLE: StyleSpecification = {
  version: 8,
  projection: GLOBE_PROJECTION,
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
        "raster-brightness-min": 0.15,
        "raster-brightness-max": 0.6,
        "raster-contrast": 0.4,
        "raster-saturation": -0.5,
      },
    },
  ],
  sky: GLOBE_SKY,
  light: GLOBE_LIGHT,
}

export async function fetchGlobeStyle(): Promise<StyleSpecification> {
  try {
    const res = await fetch(CARTO_DARK_MATTER_URL, {
      signal: AbortSignal.timeout(5_000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const style: StyleSpecification = await res.json()
    if (!style.version || !style.sources || !style.layers) {
      throw new Error("유효하지 않은 스타일 응답")
    }

    return {
      ...style,
      projection: GLOBE_PROJECTION,
      sky: GLOBE_SKY,
      light: GLOBE_LIGHT,
    }
  } catch (error) {
    console.error("다크 벡터 스타일 로드 실패, 위성 타일로 폴백:", error)
    return FALLBACK_STYLE
  }
}
