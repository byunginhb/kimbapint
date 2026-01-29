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
