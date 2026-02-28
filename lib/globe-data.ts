// ===== Globe Types =====

export type GlobeMarketCategory =
  | "politics"
  | "economy"
  | "sports"
  | "technology"
  | "society"
  | "culture"

export type GlobeCategory = "all" | GlobeMarketCategory

export type GlobeMarketStatus = "active" | "hot" | "resolved"

export interface GlobeMarketProperties {
  id: string
  title: string
  probability: number
  volume: number
  status: GlobeMarketStatus
  category: GlobeMarketCategory
  country: string
  countryCode: string
  lastTradeAt: string
}

export interface GlobeMarketFeature {
  type: "Feature"
  geometry: {
    type: "Point"
    coordinates: [number, number] // [lng, lat]
  }
  properties: GlobeMarketProperties
}

export interface GlobeMarketGeoJSON {
  type: "FeatureCollection"
  features: GlobeMarketFeature[]
}

export interface GlobeTrade {
  id: string
  marketId: string
  marketTitle: string
  type: "YES" | "NO"
  amount: number
  probability: number
  timestamp: string
  country: string
}

export interface GlobeStats {
  activeMarkets: number
  volume24h: number
  tps: number
  totalCountries: number
}

// ===== Coordinates =====

export const COUNTRY_COORDS: Record<string, [number, number]> = {
  KR: [126.978, 37.566],
  US: [-77.037, 38.907],
  JP: [139.692, 35.69],
  CN: [116.407, 39.904],
  GB: [-0.128, 51.507],
  DE: [13.405, 52.52],
  FR: [2.352, 48.857],
  TW: [121.565, 25.033],
  RU: [37.618, 55.756],
  IN: [77.209, 28.614],
  BR: [-43.173, -22.907],
  AU: [151.209, -33.868],
  SA: [46.675, 24.713],
  UA: [30.524, 50.45],
  IL: [35.217, 31.769],
  IR: [51.389, 35.689],
  SG: [103.82, 1.352],
  AE: [54.366, 24.453],
  MX: [-99.133, 19.432],
  NG: [3.379, 6.524],
}

// ===== Category Config =====

export const GLOBE_CATEGORY_CONFIG: Record<
  Exclude<GlobeCategory, "all">,
  { color: string; icon: string }
> = {
  politics: { color: "#ff6b6b", icon: "P" },
  economy: { color: "#ffd93d", icon: "E" },
  sports: { color: "#6bcb77", icon: "S" },
  technology: { color: "#4d96ff", icon: "T" },
  society: { color: "#ff922b", icon: "So" },
  culture: { color: "#cc5de8", icon: "C" },
}

// ===== Mock Market Data =====

export const GLOBE_MARKETS: GlobeMarketGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [126.978, 37.566] },
      properties: {
        id: "m1",
        title: "2027 한국 대선 여당 승리",
        probability: 0.42,
        volume: 8500000,
        status: "hot",
        category: "politics",
        country: "대한민국",
        countryCode: "KR",
        lastTradeAt: "2026-02-28T14:30:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-77.037, 38.907] },
      properties: {
        id: "m2",
        title: "US Fed Rate Cut by June 2026",
        probability: 0.67,
        volume: 12300000,
        status: "active",
        category: "economy",
        country: "미국",
        countryCode: "US",
        lastTradeAt: "2026-02-28T14:25:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [121.565, 25.033] },
      properties: {
        id: "m3",
        title: "대만 해협 군사 충돌 발생",
        probability: 0.08,
        volume: 6200000,
        status: "hot",
        category: "politics",
        country: "대만",
        countryCode: "TW",
        lastTradeAt: "2026-02-28T14:20:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [139.692, 35.69] },
      properties: {
        id: "m4",
        title: "일본 닛케이 40,000 돌파",
        probability: 0.55,
        volume: 3400000,
        status: "active",
        category: "economy",
        country: "일본",
        countryCode: "JP",
        lastTradeAt: "2026-02-28T13:45:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-0.128, 51.507] },
      properties: {
        id: "m5",
        title: "Brexit Rejoin Referendum by 2028",
        probability: 0.12,
        volume: 4100000,
        status: "active",
        category: "politics",
        country: "영국",
        countryCode: "GB",
        lastTradeAt: "2026-02-28T13:30:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [30.524, 50.45] },
      properties: {
        id: "m6",
        title: "우크라이나 휴전 합의 체결",
        probability: 0.31,
        volume: 9800000,
        status: "hot",
        category: "politics",
        country: "우크라이나",
        countryCode: "UA",
        lastTradeAt: "2026-02-28T14:15:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [116.407, 39.904] },
      properties: {
        id: "m7",
        title: "중국 GDP 성장률 5% 달성",
        probability: 0.38,
        volume: 5600000,
        status: "active",
        category: "economy",
        country: "중국",
        countryCode: "CN",
        lastTradeAt: "2026-02-28T12:00:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [37.618, 55.756] },
      properties: {
        id: "m8",
        title: "러시아 경제 제재 완화",
        probability: 0.15,
        volume: 2900000,
        status: "active",
        category: "economy",
        country: "러시아",
        countryCode: "RU",
        lastTradeAt: "2026-02-28T11:00:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [35.217, 31.769] },
      properties: {
        id: "m9",
        title: "이스라엘-팔레스타인 평화 협정",
        probability: 0.05,
        volume: 7200000,
        status: "active",
        category: "politics",
        country: "이스라엘",
        countryCode: "IL",
        lastTradeAt: "2026-02-28T13:00:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [77.209, 28.614] },
      properties: {
        id: "m10",
        title: "인도 AI 스타트업 유니콘 10개 달성",
        probability: 0.72,
        volume: 1800000,
        status: "active",
        category: "technology",
        country: "인도",
        countryCode: "IN",
        lastTradeAt: "2026-02-28T10:30:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-43.173, -22.907] },
      properties: {
        id: "m11",
        title: "브라질 2026 월드컵 4강 진출",
        probability: 0.45,
        volume: 3200000,
        status: "active",
        category: "sports",
        country: "브라질",
        countryCode: "BR",
        lastTradeAt: "2026-02-28T09:00:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [151.209, -33.868] },
      properties: {
        id: "m12",
        title: "호주 산호초 복원 프로젝트 성공",
        probability: 0.28,
        volume: 900000,
        status: "active",
        category: "society",
        country: "호주",
        countryCode: "AU",
        lastTradeAt: "2026-02-28T08:00:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [13.405, 52.52] },
      properties: {
        id: "m13",
        title: "독일 에너지 전환 목표 달성",
        probability: 0.33,
        volume: 2100000,
        status: "active",
        category: "technology",
        country: "독일",
        countryCode: "DE",
        lastTradeAt: "2026-02-28T12:30:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [2.352, 48.857] },
      properties: {
        id: "m14",
        title: "프랑스 올림픽 유산 관광 효과",
        probability: 0.61,
        volume: 1500000,
        status: "resolved",
        category: "culture",
        country: "프랑스",
        countryCode: "FR",
        lastTradeAt: "2026-02-27T18:00:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [103.82, 1.352] },
      properties: {
        id: "m15",
        title: "싱가포르 디지털 화폐 도입",
        probability: 0.58,
        volume: 2700000,
        status: "active",
        category: "technology",
        country: "싱가포르",
        countryCode: "SG",
        lastTradeAt: "2026-02-28T11:30:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [46.675, 24.713] },
      properties: {
        id: "m16",
        title: "사우디 네옴시티 1차 개장",
        probability: 0.22,
        volume: 4500000,
        status: "active",
        category: "economy",
        country: "사우디아라비아",
        countryCode: "SA",
        lastTradeAt: "2026-02-28T10:00:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [51.389, 35.689] },
      properties: {
        id: "m17",
        title: "이란 핵 합의 재개",
        probability: 0.18,
        volume: 3800000,
        status: "active",
        category: "politics",
        country: "이란",
        countryCode: "IR",
        lastTradeAt: "2026-02-28T09:30:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [54.366, 24.453] },
      properties: {
        id: "m18",
        title: "UAE AI 투자 $100B 달성",
        probability: 0.47,
        volume: 1200000,
        status: "active",
        category: "technology",
        country: "UAE",
        countryCode: "AE",
        lastTradeAt: "2026-02-28T08:30:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-99.133, 19.432] },
      properties: {
        id: "m19",
        title: "멕시코 리튬 국유화 완료",
        probability: 0.35,
        volume: 1600000,
        status: "active",
        category: "economy",
        country: "멕시코",
        countryCode: "MX",
        lastTradeAt: "2026-02-28T07:00:00Z",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [127.05, 37.51] },
      properties: {
        id: "m20",
        title: "한국 K-리그 아시아 챔피언스리그 우승",
        probability: 0.25,
        volume: 800000,
        status: "active",
        category: "sports",
        country: "대한민국",
        countryCode: "KR",
        lastTradeAt: "2026-02-28T06:00:00Z",
      },
    },
  ],
}

// ===== Mock Trades =====

export const MOCK_TRADES: GlobeTrade[] = [
  { id: "t1", marketId: "m1", marketTitle: "2027 한국 대선 여당 승리", type: "YES", amount: 500, probability: 0.43, timestamp: "2026-02-28T14:30:00Z", country: "KR" },
  { id: "t2", marketId: "m6", marketTitle: "우크라이나 휴전 합의 체결", type: "NO", amount: 1200, probability: 0.3, timestamp: "2026-02-28T14:29:00Z", country: "UA" },
  { id: "t3", marketId: "m2", marketTitle: "US Fed Rate Cut by June 2026", type: "YES", amount: 300, probability: 0.68, timestamp: "2026-02-28T14:28:00Z", country: "US" },
  { id: "t4", marketId: "m3", marketTitle: "대만 해협 군사 충돌 발생", type: "NO", amount: 2000, probability: 0.07, timestamp: "2026-02-28T14:27:00Z", country: "TW" },
  { id: "t5", marketId: "m1", marketTitle: "2027 한국 대선 여당 승리", type: "NO", amount: 800, probability: 0.41, timestamp: "2026-02-28T14:26:00Z", country: "KR" },
  { id: "t6", marketId: "m7", marketTitle: "중국 GDP 성장률 5% 달성", type: "YES", amount: 150, probability: 0.39, timestamp: "2026-02-28T14:25:00Z", country: "CN" },
  { id: "t7", marketId: "m9", marketTitle: "이스라엘-팔레스타인 평화 협정", type: "NO", amount: 3000, probability: 0.04, timestamp: "2026-02-28T14:24:00Z", country: "IL" },
  { id: "t8", marketId: "m10", marketTitle: "인도 AI 스타트업 유니콘 10개 달성", type: "YES", amount: 250, probability: 0.73, timestamp: "2026-02-28T14:23:00Z", country: "IN" },
  { id: "t9", marketId: "m4", marketTitle: "일본 닛케이 40,000 돌파", type: "YES", amount: 600, probability: 0.56, timestamp: "2026-02-28T14:22:00Z", country: "JP" },
  { id: "t10", marketId: "m15", marketTitle: "싱가포르 디지털 화폐 도입", type: "YES", amount: 400, probability: 0.59, timestamp: "2026-02-28T14:21:00Z", country: "SG" },
  { id: "t11", marketId: "m5", marketTitle: "Brexit Rejoin Referendum by 2028", type: "YES", amount: 750, probability: 0.13, timestamp: "2026-02-28T14:20:00Z", country: "GB" },
  { id: "t12", marketId: "m8", marketTitle: "러시아 경제 제재 완화", type: "NO", amount: 1800, probability: 0.14, timestamp: "2026-02-28T14:19:00Z", country: "RU" },
  { id: "t13", marketId: "m13", marketTitle: "독일 에너지 전환 목표 달성", type: "YES", amount: 420, probability: 0.34, timestamp: "2026-02-28T14:18:00Z", country: "DE" },
  { id: "t14", marketId: "m14", marketTitle: "프랑스 올림픽 유산 관광 효과", type: "NO", amount: 200, probability: 0.6, timestamp: "2026-02-28T14:17:00Z", country: "FR" },
  { id: "t15", marketId: "m11", marketTitle: "브라질 2026 월드컵 4강 진출", type: "YES", amount: 950, probability: 0.46, timestamp: "2026-02-28T14:16:00Z", country: "BR" },
  { id: "t16", marketId: "m12", marketTitle: "호주 산호초 복원 프로젝트 성공", type: "NO", amount: 130, probability: 0.27, timestamp: "2026-02-28T14:15:00Z", country: "AU" },
  { id: "t17", marketId: "m16", marketTitle: "사우디 네옴시티 1차 개장", type: "YES", amount: 2200, probability: 0.23, timestamp: "2026-02-28T14:14:00Z", country: "SA" },
  { id: "t18", marketId: "m17", marketTitle: "이란 핵 합의 재개", type: "NO", amount: 1600, probability: 0.17, timestamp: "2026-02-28T14:13:00Z", country: "IR" },
  { id: "t19", marketId: "m18", marketTitle: "UAE AI 투자 $100B 달성", type: "YES", amount: 380, probability: 0.48, timestamp: "2026-02-28T14:12:00Z", country: "AE" },
  { id: "t20", marketId: "m19", marketTitle: "멕시코 리튬 국유화 완료", type: "NO", amount: 560, probability: 0.34, timestamp: "2026-02-28T14:11:00Z", country: "MX" },
  { id: "t21", marketId: "m20", marketTitle: "한국 K-리그 아시아 챔피언스리그 우승", type: "YES", amount: 310, probability: 0.26, timestamp: "2026-02-28T14:10:00Z", country: "KR" },
  { id: "t22", marketId: "m2", marketTitle: "US Fed Rate Cut by June 2026", type: "NO", amount: 4500, probability: 0.66, timestamp: "2026-02-28T14:09:00Z", country: "US" },
  { id: "t23", marketId: "m1", marketTitle: "2027 한국 대선 여당 승리", type: "YES", amount: 1100, probability: 0.44, timestamp: "2026-02-28T14:08:00Z", country: "KR" },
  { id: "t24", marketId: "m6", marketTitle: "우크라이나 휴전 합의 체결", type: "YES", amount: 2700, probability: 0.32, timestamp: "2026-02-28T14:07:00Z", country: "UA" },
  { id: "t25", marketId: "m3", marketTitle: "대만 해협 군사 충돌 발생", type: "YES", amount: 850, probability: 0.09, timestamp: "2026-02-28T14:06:00Z", country: "TW" },
  { id: "t26", marketId: "m7", marketTitle: "중국 GDP 성장률 5% 달성", type: "NO", amount: 700, probability: 0.37, timestamp: "2026-02-28T14:05:00Z", country: "CN" },
  { id: "t27", marketId: "m10", marketTitle: "인도 AI 스타트업 유니콘 10개 달성", type: "NO", amount: 190, probability: 0.71, timestamp: "2026-02-28T14:04:00Z", country: "IN" },
  { id: "t28", marketId: "m4", marketTitle: "일본 닛케이 40,000 돌파", type: "NO", amount: 1400, probability: 0.54, timestamp: "2026-02-28T14:03:00Z", country: "JP" },
  { id: "t29", marketId: "m9", marketTitle: "이스라엘-팔레스타인 평화 협정", type: "YES", amount: 5000, probability: 0.06, timestamp: "2026-02-28T14:02:00Z", country: "IL" },
  { id: "t30", marketId: "m5", marketTitle: "Brexit Rejoin Referendum by 2028", type: "NO", amount: 920, probability: 0.11, timestamp: "2026-02-28T14:01:00Z", country: "GB" },
  { id: "t31", marketId: "m8", marketTitle: "러시아 경제 제재 완화", type: "YES", amount: 340, probability: 0.16, timestamp: "2026-02-28T14:00:00Z", country: "RU" },
  { id: "t32", marketId: "m15", marketTitle: "싱가포르 디지털 화폐 도입", type: "NO", amount: 280, probability: 0.57, timestamp: "2026-02-28T13:59:00Z", country: "SG" },
  { id: "t33", marketId: "m11", marketTitle: "브라질 2026 월드컵 4강 진출", type: "NO", amount: 1050, probability: 0.44, timestamp: "2026-02-28T13:58:00Z", country: "BR" },
  { id: "t34", marketId: "m13", marketTitle: "독일 에너지 전환 목표 달성", type: "NO", amount: 670, probability: 0.32, timestamp: "2026-02-28T13:57:00Z", country: "DE" },
  { id: "t35", marketId: "m16", marketTitle: "사우디 네옴시티 1차 개장", type: "NO", amount: 3100, probability: 0.21, timestamp: "2026-02-28T13:56:00Z", country: "SA" },
  { id: "t36", marketId: "m12", marketTitle: "호주 산호초 복원 프로젝트 성공", type: "YES", amount: 175, probability: 0.29, timestamp: "2026-02-28T13:55:00Z", country: "AU" },
  { id: "t37", marketId: "m14", marketTitle: "프랑스 올림픽 유산 관광 효과", type: "YES", amount: 450, probability: 0.62, timestamp: "2026-02-28T13:54:00Z", country: "FR" },
  { id: "t38", marketId: "m17", marketTitle: "이란 핵 합의 재개", type: "YES", amount: 2100, probability: 0.19, timestamp: "2026-02-28T13:53:00Z", country: "IR" },
  { id: "t39", marketId: "m18", marketTitle: "UAE AI 투자 $100B 달성", type: "NO", amount: 520, probability: 0.46, timestamp: "2026-02-28T13:52:00Z", country: "AE" },
  { id: "t40", marketId: "m19", marketTitle: "멕시코 리튬 국유화 완료", type: "YES", amount: 890, probability: 0.36, timestamp: "2026-02-28T13:51:00Z", country: "MX" },
]

// ===== Mock Stats =====

export const MOCK_GLOBE_STATS: GlobeStats = {
  activeMarkets: 19,
  volume24h: 45230000,
  tps: 2.3,
  totalCountries: 18,
}

// ===== Utility Functions =====

export function getMarketsByCategory(
  category: GlobeCategory
): GlobeMarketFeature[] {
  if (category === "all") return GLOBE_MARKETS.features
  return GLOBE_MARKETS.features.filter(
    (f) => f.properties.category === category
  )
}

export function getMarketById(id: string): GlobeMarketFeature | undefined {
  return GLOBE_MARKETS.features.find((f) => f.properties.id === id)
}

export function formatGlobeVolume(volume: number): string {
  if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`
  if (volume >= 1000) return `${(volume / 1000).toFixed(0)}K`
  return volume.toString()
}

export function getStatusColor(status: GlobeMarketStatus): string {
  switch (status) {
    case "active":
      return "#00ff88"
    case "hot":
      return "#ff4444"
    case "resolved":
      return "#666666"
  }
}

export function getMarkerRadius(volume: number): number {
  const minRadius = 6
  const maxRadius = 20
  const minVol = 500000
  const maxVol = 15000000
  const clamped = Math.max(minVol, Math.min(maxVol, volume))
  const ratio = (clamped - minVol) / (maxVol - minVol)
  return minRadius + ratio * (maxRadius - minRadius)
}

export function buildFilteredGeoJSON(
  category: GlobeCategory
): GlobeMarketGeoJSON {
  return {
    type: "FeatureCollection",
    features: getMarketsByCategory(category),
  }
}
