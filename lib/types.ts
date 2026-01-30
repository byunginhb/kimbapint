export type ThreatLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type Region = "전체" | "한반도" | "동북아" | "동남아" | "미주" | "중동";

export interface Market {
  id: string;
  slug: string;
  title: string;
  description: string;
  probability: number;
  volume24h: number;
  totalVolume: number;
  region: Region;
  endDate: string;
  trend: "up" | "down" | "stable";
  createdAt: string;
}

export interface Location {
  name: string;
  count: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface DeliveryStats {
  todayOrders: number;
  hourlyOrders: number[];
  weeklyOrders: number[];
  weeklyAverage: number;
  change24h: number;
  anomalyDetected: boolean;
  topLocations: Location[];
}

export interface DashboardState {
  threatLevel: ThreatLevel;
  lastUpdated: string;
  isScanning: boolean;
  deliveryStats: DeliveryStats;
  markets: Market[];
}

export const THREAT_LEVEL_CONFIG: Record<
  ThreatLevel,
  { label: string; color: string; bgColor: string; description: string }
> = {
  LOW: {
    label: "낮음",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "정상 수준의 김밥 주문량",
  },
  MEDIUM: {
    label: "보통",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    description: "평균보다 높은 김밥 주문량 감지",
  },
  HIGH: {
    label: "높음",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    description: "비정상적으로 높은 김밥 주문량",
  },
  CRITICAL: {
    label: "심각",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "역대 최고 수준의 김밥 주문량",
  },
};

export const REGION_CONFIG: Record<Region, { emoji: string; description: string }> = {
  전체: { emoji: "🌏", description: "모든 지역" },
  한반도: { emoji: "🇰🇷", description: "남북한 관련" },
  동북아: { emoji: "🗾", description: "한중일 및 대만" },
  동남아: { emoji: "🌴", description: "동남아시아" },
  미주: { emoji: "🇺🇸", description: "미국 및 아메리카" },
  중동: { emoji: "🕌", description: "중동 지역" },
};

// 김밥집 관련 타입
export type ShopStatus = "NOMINAL" | "BUSY" | "CLOSED" | "SPIKE";

export interface HourlyData {
  hour: number;
  value: number;
}

export interface KimbapShop {
  id: string;
  name: string;
  status: ShopStatus;
  distance: string;
  statusText: string;
  hourlyData: HourlyData[];
}

export interface AnomalyRecord {
  date: string;
  type: "SPIKE" | "DROP" | "PATTERN";
  description: string;
}

export interface KimbapShopDetail extends KimbapShop {
  address: string;
  phone: string;
  operatingHours: { open: string; close: string };
  weeklyOrders: number[];
  coordinates: { lat: number; lng: number };
  nearbyFacility: string;
  anomalyHistory: AnomalyRecord[];
  relatedMarkets: string[];
}

export const SHOP_STATUS_CONFIG: Record<
  ShopStatus,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  NOMINAL: {
    label: "정상",
    color: "text-green-400",
    bgColor: "bg-green-900/20",
    borderColor: "border-green-500/40",
  },
  BUSY: {
    label: "바쁨",
    color: "text-yellow-400",
    bgColor: "bg-yellow-900/20",
    borderColor: "border-yellow-500/40",
  },
  CLOSED: {
    label: "영업종료",
    color: "text-gray-400",
    bgColor: "bg-gray-800",
    borderColor: "border-gray-600",
  },
  SPIKE: {
    label: "급증",
    color: "text-red-400",
    bgColor: "bg-red-900/20",
    borderColor: "border-red-500/40",
  },
};

// 마켓 상세 관련 타입
export interface ProbabilityHistoryEntry {
  date: string;
  probability: number;
}

export interface VolumeHistoryEntry {
  date: string;
  volume: number;
}

export interface MarketEvent {
  date: string;
  event: string;
  impact: "positive" | "negative" | "neutral";
}

export interface RelatedNews {
  title: string;
  source: string;
  date: string;
}

export interface MarketDetail extends Market {
  probabilityHistory: ProbabilityHistoryEntry[];
  volumeHistory: VolumeHistoryEntry[];
  keyEvents: MarketEvent[];
  relatedNews: RelatedNews[];
  relatedShops: string[];
}

// KIMBAPCON 히스토리 관련 타입
export interface KimbapconHistory {
  id: string;
  date: string;
  level: number;
  previousLevel: number;
  status: string;
  trigger: string;
}

export interface MajorEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "military" | "political" | "economic" | "natural";
  impact: "high" | "medium" | "low";
  kimbapconEffect: number;
}

export const KIMBAPCON_LEVELS: Record<
  number,
  { name: string; color: string; bgColor: string; description: string }
> = {
  1: {
    name: "KIMBAPCON 1",
    color: "text-red-500",
    bgColor: "bg-red-500/20",
    description: "최고 경계 - 전면전 임박",
  },
  2: {
    name: "KIMBAPCON 2",
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
    description: "고도 경계 - 심각한 군사적 긴장",
  },
  3: {
    name: "KIMBAPCON 3",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
    description: "상승 경계 - 긴장 고조",
  },
  4: {
    name: "KIMBAPCON 4",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    description: "일반 경계 - 정상 모니터링",
  },
  5: {
    name: "KIMBAPCON 5",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    description: "평시 상태 - 안정적",
  },
};
