import type { Market, DeliveryStats, DashboardState, Region } from "./types";

export const mockMarkets: Market[] = [
  {
    id: "1",
    slug: "korea-military-clash-2025",
    title: "2025년 내 한반도 군사 충돌 발생",
    description: "북한과 남한 간 무력 충돌(포격, 교전 등) 발생 확률",
    probability: 0.085,
    volume24h: 245000000,
    totalVolume: 1250000000,
    region: "한반도",
    endDate: "2025-12-31",
    trend: "stable",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    slug: "north-korea-missile-test",
    title: "이번 달 북한 미사일 발사",
    description: "이번 달 내 북한 탄도 미사일 시험 발사 여부",
    probability: 0.42,
    volume24h: 189000000,
    totalVolume: 890000000,
    region: "한반도",
    endDate: "2025-02-28",
    trend: "up",
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    slug: "us-china-taiwan-2025",
    title: "대만 해협 군사 긴장 고조",
    description: "미중 간 대만 관련 군사적 대치 상황 발생",
    probability: 0.175,
    volume24h: 520000000,
    totalVolume: 3200000000,
    region: "동북아",
    endDate: "2025-12-31",
    trend: "up",
    createdAt: "2024-01-01",
  },
  {
    id: "4",
    slug: "japan-korea-dispute",
    title: "한일 외교 갈등 심화",
    description: "독도/역사 문제로 인한 한일 외교 갈등 격화",
    probability: 0.28,
    volume24h: 78000000,
    totalVolume: 420000000,
    region: "동북아",
    endDate: "2025-06-30",
    trend: "down",
    createdAt: "2024-03-15",
  },
  {
    id: "5",
    slug: "south-china-sea-incident",
    title: "남중국해 군사 충돌",
    description: "남중국해에서 중국과 주변국 간 군사적 충돌 발생",
    probability: 0.12,
    volume24h: 320000000,
    totalVolume: 1800000000,
    region: "동남아",
    endDate: "2025-12-31",
    trend: "stable",
    createdAt: "2024-02-20",
  },
  {
    id: "6",
    slug: "us-iran-conflict",
    title: "미국-이란 직접 충돌",
    description: "미국과 이란 간 직접적인 군사 충돌 발생",
    probability: 0.095,
    volume24h: 410000000,
    totalVolume: 2100000000,
    region: "중동",
    endDate: "2025-12-31",
    trend: "up",
    createdAt: "2024-01-10",
  },
  {
    id: "7",
    slug: "north-korea-nuclear-test",
    title: "북한 7차 핵실험",
    description: "북한의 7차 핵실험 실시 여부",
    probability: 0.31,
    volume24h: 280000000,
    totalVolume: 1500000000,
    region: "한반도",
    endDate: "2025-12-31",
    trend: "up",
    createdAt: "2024-01-05",
  },
  {
    id: "8",
    slug: "us-north-korea-summit",
    title: "미북 정상회담 개최",
    description: "2025년 내 미국-북한 정상회담 개최 여부",
    probability: 0.15,
    volume24h: 95000000,
    totalVolume: 620000000,
    region: "미주",
    endDate: "2025-12-31",
    trend: "stable",
    createdAt: "2024-04-01",
  },
];

export const mockDeliveryStats: DeliveryStats = {
  todayOrders: 847,
  hourlyOrders: [
    12, 8, 5, 3, 2, 15, 45, 78, 89, 92, 95, 88, 75, 82, 91, 97, 89, 72, 65, 45, 32, 28, 18, 15,
  ],
  weeklyOrders: [720, 685, 892, 756, 823, 901, 847],
  weeklyAverage: 803,
  change24h: 12.5,
  anomalyDetected: true,
  topLocations: [
    { name: "국방부 본관", count: 156, coordinates: { lat: 37.5052, lng: 126.9771 } },
    { name: "용산대통령실", count: 134, coordinates: { lat: 37.5340, lng: 126.9775 } },
    { name: "합참 본부", count: 98, coordinates: { lat: 37.5055, lng: 126.9780 } },
    { name: "육군본부", count: 87, coordinates: { lat: 37.5100, lng: 126.9790 } },
    { name: "공군본부", count: 72, coordinates: { lat: 37.5020, lng: 126.9800 } },
  ],
};

export const mockDashboardState: DashboardState = {
  threatLevel: "MEDIUM",
  lastUpdated: new Date().toISOString(),
  isScanning: true,
  deliveryStats: mockDeliveryStats,
  markets: mockMarkets,
};

export function getMarketsByRegion(region: Region): Market[] {
  if (region === "전체") return mockMarkets;
  return mockMarkets.filter((market) => market.region === region);
}

export function getWeekdayLabels(): string[] {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date().getDay();
  const result: string[] = [];
  for (let i = 6; i >= 0; i--) {
    result.push(days[(today - i + 7) % 7]);
  }
  return result;
}
