// ===== Globe Beam Types =====

export interface GlobeBeam {
  id: string
  from: [number, number]
  to: [number, number]
  arcPoints: [number, number][]
  startedAt: number
  travelMs: number
  fadeMs: number
  color: string
}

export interface BeamProgress {
  headIndex: number
  opacity: number
  isExpired: boolean
}

// ===== Constants =====

const ARC_SEGMENTS = 64
const DEFAULT_TRAVEL_MS = 2000
const DEFAULT_FADE_MS = 1000
const DEFAULT_COLOR = "#00d4ff"
const TRAIL_LENGTH = 20

// ===== Great Circle Interpolation (Slerp) =====

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180
}

function toCartesian(lng: number, lat: number): [number, number, number] {
  const lngR = toRadians(lng)
  const latR = toRadians(lat)
  return [
    Math.cos(latR) * Math.cos(lngR),
    Math.cos(latR) * Math.sin(lngR),
    Math.sin(latR),
  ]
}

function toDegrees(rad: number): number {
  return (rad * 180) / Math.PI
}

function fromCartesian(x: number, y: number, z: number): [number, number] {
  const lat = toDegrees(Math.asin(z))
  const lng = toDegrees(Math.atan2(y, x))
  return [lng, lat]
}

export function interpolateGreatCircle(
  from: [number, number],
  to: [number, number],
  segments: number = ARC_SEGMENTS
): [number, number][] {
  const a = toCartesian(from[0], from[1])
  const b = toCartesian(to[0], to[1])

  const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  const omega = Math.acos(Math.min(1, Math.max(-1, dot)))

  // If points are nearly identical, return a straight line
  if (omega < 1e-6) {
    return Array.from({ length: segments + 1 }, (_, i) => {
      const t = i / segments
      return [
        from[0] + (to[0] - from[0]) * t,
        from[1] + (to[1] - from[1]) * t,
      ] as [number, number]
    })
  }

  const sinOmega = Math.sin(omega)

  return Array.from({ length: segments + 1 }, (_, i) => {
    const t = i / segments
    const coeffA = Math.sin((1 - t) * omega) / sinOmega
    const coeffB = Math.sin(t * omega) / sinOmega

    const x = coeffA * a[0] + coeffB * b[0]
    const y = coeffA * a[1] + coeffB * b[1]
    const z = coeffA * a[2] + coeffB * b[2]

    return fromCartesian(x, y, z)
  })
}

// ===== Beam Factory =====

export function createBeam(
  from: [number, number],
  to: [number, number],
  color: string = DEFAULT_COLOR
): GlobeBeam {
  return {
    id: crypto.randomUUID(),
    from,
    to,
    arcPoints: interpolateGreatCircle(from, to),
    startedAt: Date.now(),
    travelMs: DEFAULT_TRAVEL_MS,
    fadeMs: DEFAULT_FADE_MS,
    color,
  }
}

// ===== Beam Progress =====

export function getBeamProgress(beam: GlobeBeam, now: number): BeamProgress {
  const elapsed = now - beam.startedAt
  const totalMs = beam.travelMs + beam.fadeMs
  const lastIndex = beam.arcPoints.length - 1

  if (elapsed >= totalMs) {
    return { headIndex: lastIndex, opacity: 0, isExpired: true }
  }

  if (elapsed <= beam.travelMs) {
    const travelRatio = elapsed / beam.travelMs
    return {
      headIndex: Math.round(travelRatio * lastIndex),
      opacity: 1,
      isExpired: false,
    }
  }

  const fadeElapsed = elapsed - beam.travelMs
  const fadeRatio = fadeElapsed / beam.fadeMs
  return {
    headIndex: lastIndex,
    opacity: 1 - fadeRatio,
    isExpired: false,
  }
}

// ===== GeoJSON Converters =====

export function beamsToTrailGeoJSON(
  beams: readonly GlobeBeam[],
  now: number
): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = []

  for (const beam of beams) {
    const { headIndex, opacity, isExpired } = getBeamProgress(beam, now)
    if (isExpired || headIndex < 1) continue

    const trailStart = Math.max(0, headIndex - TRAIL_LENGTH)
    const trailCoords = beam.arcPoints.slice(trailStart, headIndex + 1)

    if (trailCoords.length < 2) continue

    features.push({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: trailCoords,
      },
      properties: {
        color: beam.color,
        opacity,
      },
    })
  }

  return { type: "FeatureCollection", features }
}

export function beamsToHeadGeoJSON(
  beams: readonly GlobeBeam[],
  now: number
): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = []

  for (const beam of beams) {
    const { headIndex, opacity, isExpired } = getBeamProgress(beam, now)
    if (isExpired) continue

    const coord = beam.arcPoints[headIndex]

    features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: coord,
      },
      properties: {
        color: beam.color,
        opacity,
      },
    })
  }

  return { type: "FeatureCollection", features }
}
