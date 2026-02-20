export type ThreatLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type Region = "all" | "korean_peninsula" | "northeast_asia" | "southeast_asia" | "americas" | "middle_east";

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
  { color: string; bgColor: string }
> = {
  LOW: {
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  MEDIUM: {
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  HIGH: {
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  CRITICAL: {
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
};

export const REGION_CONFIG: Record<Region, { emoji: string }> = {
  all: { emoji: "🌏" },
  korean_peninsula: { emoji: "🇰🇷" },
  northeast_asia: { emoji: "🗾" },
  southeast_asia: { emoji: "🌴" },
  americas: { emoji: "🇺🇸" },
  middle_east: { emoji: "🕌" },
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
  { color: string; bgColor: string; borderColor: string }
> = {
  NOMINAL: {
    color: "text-green-400",
    bgColor: "bg-green-900/20",
    borderColor: "border-green-500/40",
  },
  BUSY: {
    color: "text-yellow-400",
    bgColor: "bg-yellow-900/20",
    borderColor: "border-yellow-500/40",
  },
  CLOSED: {
    color: "text-gray-400",
    bgColor: "bg-gray-800",
    borderColor: "border-gray-600",
  },
  SPIKE: {
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
  { name: string; color: string; bgColor: string }
> = {
  1: {
    name: "KIMBAPCON 1",
    color: "text-red-500",
    bgColor: "bg-red-500/20",
  },
  2: {
    name: "KIMBAPCON 2",
    color: "text-orange-500",
    bgColor: "bg-orange-500/20",
  },
  3: {
    name: "KIMBAPCON 3",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20",
  },
  4: {
    name: "KIMBAPCON 4",
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
  },
  5: {
    name: "KIMBAPCON 5",
    color: "text-green-500",
    bgColor: "bg-green-500/20",
  },
};
