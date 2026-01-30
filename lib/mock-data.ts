import type {
  Market,
  DeliveryStats,
  DashboardState,
  Region,
  KimbapShop,
  KimbapShopDetail,
  HourlyData,
  MarketDetail,
  ProbabilityHistoryEntry,
  VolumeHistoryEntry,
  KimbapconHistory,
  MajorEvent,
} from "./types";

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

// 시간별 데이터 (고정된 시드 기반)
function generateHourlyData(seed: number, baseValue: number, variance: number, closedHours?: { start: number; end: number }): HourlyData[] {
  // 간단한 시드 기반 난수 생성 (일관된 결과)
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  return Array.from({ length: 24 }, (_, i) => {
    if (closedHours && (i >= closedHours.start || i < closedHours.end)) {
      return { hour: i, value: 0 };
    }
    return {
      hour: i,
      value: Math.floor(seededRandom(seed + i) * variance) + baseValue,
    };
  });
}

// 김밥집 기본 데이터
export const mockShops: KimbapShop[] = [
  {
    id: "1",
    name: "국방부 김밥천국",
    status: "NOMINAL",
    distance: "0.3 km",
    statusText: "평소와 비슷함",
    hourlyData: generateHourlyData(100, 20, 80),
  },
  {
    id: "2",
    name: "용산 맛있는 김밥",
    status: "CLOSED",
    distance: "0.5 km",
    statusText: "영업 종료",
    hourlyData: generateHourlyData(200, 10, 60, { start: 22, end: 6 }),
  },
  {
    id: "3",
    name: "합참 김밥나라",
    status: "CLOSED",
    distance: "0.8 km",
    statusText: "영업 종료",
    hourlyData: generateHourlyData(300, 15, 70, { start: 21, end: 7 }),
  },
  {
    id: "4",
    name: "육본 김밥",
    status: "SPIKE",
    distance: "1.2 km",
    statusText: "평소보다 매우 바쁨",
    hourlyData: generateHourlyData(400, 50, 100),
  },
  {
    id: "5",
    name: "공군본부 김밥집",
    status: "BUSY",
    distance: "1.5 km",
    statusText: "평소보다 바쁨",
    hourlyData: generateHourlyData(500, 30, 90),
  },
  {
    id: "6",
    name: "THE 김밥",
    status: "NOMINAL",
    distance: "1.8 km",
    statusText: "평소와 비슷함",
    hourlyData: generateHourlyData(600, 25, 70),
  },
  {
    id: "7",
    name: "바른김밥 용산점",
    status: "BUSY",
    distance: "2.0 km",
    statusText: "평소보다 바쁨",
    hourlyData: generateHourlyData(700, 35, 85),
  },
  {
    id: "8",
    name: "청와대 앞 김밥",
    status: "CLOSED",
    distance: "2.5 km",
    statusText: "영업 종료",
    hourlyData: generateHourlyData(800, 20, 65, { start: 20, end: 8 }),
  },
];

// 김밥집 상세 데이터
export const mockShopDetails: KimbapShopDetail[] = [
  {
    ...mockShops[0],
    address: "서울특별시 용산구 이태원로 22 국방부 본관 인근",
    phone: "02-748-1234",
    operatingHours: { open: "06:00", close: "22:00" },
    weeklyOrders: [245, 312, 287, 356, 298, 267, 189],
    coordinates: { lat: 37.5052, lng: 126.9771 },
    nearbyFacility: "국방부 본관",
    anomalyHistory: [
      { date: "2025-01-28", type: "SPIKE", description: "주문량 45% 급증 감지" },
      { date: "2025-01-15", type: "SPIKE", description: "점심시간 주문량 2배 증가" },
      { date: "2024-12-20", type: "PATTERN", description: "비정상적 심야 주문 패턴" },
    ],
    relatedMarkets: ["1", "2", "7"],
  },
  {
    ...mockShops[1],
    address: "서울특별시 용산구 한남대로 95",
    phone: "02-792-5678",
    operatingHours: { open: "07:00", close: "21:00" },
    weeklyOrders: [178, 195, 203, 189, 167, 145, 112],
    coordinates: { lat: 37.5340, lng: 126.9775 },
    nearbyFacility: "용산대통령실",
    anomalyHistory: [
      { date: "2025-01-20", type: "DROP", description: "주문량 30% 급감" },
    ],
    relatedMarkets: ["1", "2"],
  },
  {
    ...mockShops[2],
    address: "서울특별시 용산구 이태원로 45",
    phone: "02-749-9012",
    operatingHours: { open: "06:30", close: "20:30" },
    weeklyOrders: [156, 178, 189, 201, 187, 156, 98],
    coordinates: { lat: 37.5055, lng: 126.9780 },
    nearbyFacility: "합참 본부",
    anomalyHistory: [
      { date: "2025-01-25", type: "SPIKE", description: "오전 주문량 급증" },
      { date: "2025-01-10", type: "PATTERN", description: "새벽 5시 다량 주문" },
    ],
    relatedMarkets: ["1", "7"],
  },
  {
    ...mockShops[3],
    address: "서울특별시 용산구 녹사평대로 150",
    phone: "02-790-3456",
    operatingHours: { open: "05:30", close: "23:00" },
    weeklyOrders: [412, 389, 445, 478, 501, 423, 356],
    coordinates: { lat: 37.5100, lng: 126.9790 },
    nearbyFacility: "육군본부",
    anomalyHistory: [
      { date: "2025-01-29", type: "SPIKE", description: "현재 주문량 120% 급증 중" },
      { date: "2025-01-27", type: "SPIKE", description: "저녁 주문량 급증" },
      { date: "2025-01-22", type: "SPIKE", description: "전일 대비 80% 증가" },
      { date: "2025-01-18", type: "PATTERN", description: "연속 3일 증가 추세" },
    ],
    relatedMarkets: ["1", "2", "7"],
  },
  {
    ...mockShops[4],
    address: "서울특별시 용산구 원효로 180",
    phone: "02-751-7890",
    operatingHours: { open: "06:00", close: "21:30" },
    weeklyOrders: [234, 256, 278, 289, 267, 234, 189],
    coordinates: { lat: 37.5020, lng: 126.9800 },
    nearbyFacility: "공군본부",
    anomalyHistory: [
      { date: "2025-01-26", type: "SPIKE", description: "점심 피크 시간 연장" },
    ],
    relatedMarkets: ["2"],
  },
  {
    ...mockShops[5],
    address: "서울특별시 용산구 한강대로 250",
    phone: "02-793-1234",
    operatingHours: { open: "07:00", close: "22:00" },
    weeklyOrders: [167, 178, 189, 195, 178, 156, 134],
    coordinates: { lat: 37.5030, lng: 126.9750 },
    nearbyFacility: "용산역",
    anomalyHistory: [],
    relatedMarkets: ["1"],
  },
  {
    ...mockShops[6],
    address: "서울특별시 용산구 청파로 85",
    phone: "02-794-5678",
    operatingHours: { open: "06:30", close: "21:00" },
    weeklyOrders: [198, 223, 245, 267, 234, 198, 167],
    coordinates: { lat: 37.5080, lng: 126.9720 },
    nearbyFacility: "숙명여대",
    anomalyHistory: [
      { date: "2025-01-24", type: "SPIKE", description: "오후 주문량 35% 증가" },
    ],
    relatedMarkets: [],
  },
  {
    ...mockShops[7],
    address: "서울특별시 종로구 청와대로 1",
    phone: "02-730-9012",
    operatingHours: { open: "08:00", close: "19:30" },
    weeklyOrders: [89, 112, 134, 145, 123, 98, 67],
    coordinates: { lat: 37.5866, lng: 126.9750 },
    nearbyFacility: "청와대",
    anomalyHistory: [
      { date: "2025-01-12", type: "PATTERN", description: "주말 주문량 급감 패턴" },
    ],
    relatedMarkets: ["1", "8"],
  },
];

// 김밥집 조회 함수
export function getShopById(id: string): KimbapShopDetail | undefined {
  return mockShopDetails.find((shop) => shop.id === id);
}

export function getShopsByStatus(status: KimbapShop["status"]): KimbapShop[] {
  return mockShops.filter((shop) => shop.status === status);
}

// 확률 히스토리 생성 헬퍼 함수
function generateProbabilityHistory(baseProbability: number, days: number = 30): ProbabilityHistoryEntry[] {
  const history: ProbabilityHistoryEntry[] = [];
  let currentProb = baseProbability;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    history.push({
      date: date.toISOString().split("T")[0],
      probability: Math.max(0, Math.min(1, currentProb + (Math.random() - 0.5) * 0.05)),
    });
    currentProb = history[history.length - 1].probability;
  }

  return history;
}

// 거래량 히스토리 생성 헬퍼 함수
function generateVolumeHistory(baseVolume: number, days: number = 30): VolumeHistoryEntry[] {
  const history: VolumeHistoryEntry[] = [];

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    history.push({
      date: date.toISOString().split("T")[0],
      volume: Math.floor(baseVolume * (0.8 + Math.random() * 0.4)),
    });
  }

  return history;
}

// 마켓 상세 데이터
export const mockMarketDetails: MarketDetail[] = [
  {
    ...mockMarkets[0],
    probabilityHistory: generateProbabilityHistory(0.085),
    volumeHistory: generateVolumeHistory(245000000 / 30),
    keyEvents: [
      { date: "2025-01-28", event: "북한 단거리 미사일 발사", impact: "negative" },
      { date: "2025-01-20", event: "남북 고위급 회담 무산", impact: "negative" },
      { date: "2025-01-15", event: "DMZ 인근 군사 훈련 실시", impact: "neutral" },
      { date: "2025-01-10", event: "한미 연합훈련 일정 발표", impact: "negative" },
    ],
    relatedNews: [
      { title: "북한, 새해 첫 미사일 발사 감행", source: "연합뉴스", date: "2025-01-28" },
      { title: "국방부, 대북 감시태세 강화 지시", source: "KBS", date: "2025-01-27" },
      { title: "전문가 \"올해 한반도 긴장 고조 가능성\"", source: "조선일보", date: "2025-01-25" },
    ],
    relatedShops: ["1", "3", "4"],
  },
  {
    ...mockMarkets[1],
    probabilityHistory: generateProbabilityHistory(0.42),
    volumeHistory: generateVolumeHistory(189000000 / 30),
    keyEvents: [
      { date: "2025-01-29", event: "북한 미사일 발사 징후 포착", impact: "negative" },
      { date: "2025-01-25", event: "미국 정찰기 한반도 출격", impact: "neutral" },
      { date: "2025-01-18", event: "북한 김정은 군사시설 시찰", impact: "negative" },
    ],
    relatedNews: [
      { title: "미 정보당국 \"북한 미사일 발사 임박\"", source: "VOA", date: "2025-01-29" },
      { title: "일본, 북한 미사일 대비 경계 강화", source: "NHK", date: "2025-01-28" },
    ],
    relatedShops: ["1", "2", "4", "5"],
  },
  {
    ...mockMarkets[2],
    probabilityHistory: generateProbabilityHistory(0.175),
    volumeHistory: generateVolumeHistory(520000000 / 30),
    keyEvents: [
      { date: "2025-01-27", event: "중국 대만해협 군사훈련 실시", impact: "negative" },
      { date: "2025-01-22", event: "미국 군함 대만해협 통과", impact: "negative" },
      { date: "2025-01-15", event: "대만 총통 취임 연설", impact: "neutral" },
    ],
    relatedNews: [
      { title: "중국 군용기 대만 방공식별구역 진입", source: "Reuters", date: "2025-01-27" },
      { title: "미국, 대만에 무기 판매 승인", source: "AP", date: "2025-01-20" },
    ],
    relatedShops: ["6"],
  },
  {
    ...mockMarkets[3],
    probabilityHistory: generateProbabilityHistory(0.28),
    volumeHistory: generateVolumeHistory(78000000 / 30),
    keyEvents: [
      { date: "2025-01-26", event: "일본 독도 영유권 주장 재확인", impact: "negative" },
      { date: "2025-01-18", event: "한일 외교장관 회담", impact: "positive" },
      { date: "2025-01-10", event: "일본 역사교과서 논란", impact: "negative" },
    ],
    relatedNews: [
      { title: "외교부, 일본 독도 주장에 강력 항의", source: "연합뉴스", date: "2025-01-26" },
      { title: "한일 관계 개선 기대감 속 긴장 지속", source: "동아일보", date: "2025-01-20" },
    ],
    relatedShops: [],
  },
  {
    ...mockMarkets[4],
    probabilityHistory: generateProbabilityHistory(0.12),
    volumeHistory: generateVolumeHistory(320000000 / 30),
    keyEvents: [
      { date: "2025-01-25", event: "중국-필리핀 해상 대치", impact: "negative" },
      { date: "2025-01-20", event: "미국 남중국해 순찰 강화", impact: "neutral" },
    ],
    relatedNews: [
      { title: "남중국해 긴장 고조, 주변국 우려", source: "BBC", date: "2025-01-25" },
    ],
    relatedShops: [],
  },
  {
    ...mockMarkets[5],
    probabilityHistory: generateProbabilityHistory(0.095),
    volumeHistory: generateVolumeHistory(410000000 / 30),
    keyEvents: [
      { date: "2025-01-28", event: "이란 혁명수비대 미군 기지 인근 활동", impact: "negative" },
      { date: "2025-01-22", event: "미국-이란 간접 협상 결렬", impact: "negative" },
      { date: "2025-01-15", event: "호르무즈 해협 유조선 피격", impact: "negative" },
    ],
    relatedNews: [
      { title: "중동 긴장 고조, 유가 급등", source: "Bloomberg", date: "2025-01-28" },
      { title: "미국, 중동 병력 증강 검토", source: "CNN", date: "2025-01-25" },
    ],
    relatedShops: [],
  },
  {
    ...mockMarkets[6],
    probabilityHistory: generateProbabilityHistory(0.31),
    volumeHistory: generateVolumeHistory(280000000 / 30),
    keyEvents: [
      { date: "2025-01-27", event: "풍계리 핵실험장 활동 징후", impact: "negative" },
      { date: "2025-01-20", event: "북한 핵무력 강화 선언", impact: "negative" },
      { date: "2025-01-12", event: "IAEA 북한 핵시설 감시 보고", impact: "neutral" },
    ],
    relatedNews: [
      { title: "위성사진으로 포착된 북한 핵시설 움직임", source: "38 North", date: "2025-01-27" },
      { title: "전문가 \"7차 핵실험 가능성 높아져\"", source: "한겨레", date: "2025-01-25" },
    ],
    relatedShops: ["1", "3", "4"],
  },
  {
    ...mockMarkets[7],
    probabilityHistory: generateProbabilityHistory(0.15),
    volumeHistory: generateVolumeHistory(95000000 / 30),
    keyEvents: [
      { date: "2025-01-25", event: "미국 대북 특사 방한", impact: "positive" },
      { date: "2025-01-18", event: "북한 외무성 대화 의지 시사", impact: "positive" },
      { date: "2025-01-10", event: "트럼프 행정부 대북 정책 발표", impact: "neutral" },
    ],
    relatedNews: [
      { title: "미북 대화 재개 가능성에 기대감", source: "Washington Post", date: "2025-01-25" },
      { title: "한국 정부, 미북 정상회담 중재 의지", source: "중앙일보", date: "2025-01-20" },
    ],
    relatedShops: ["1", "8"],
  },
];

// 마켓 조회 함수
export function getMarketBySlug(slug: string): MarketDetail | undefined {
  return mockMarketDetails.find((market) => market.slug === slug);
}

export function getMarketById(id: string): MarketDetail | undefined {
  return mockMarketDetails.find((market) => market.id === id);
}

// KIMBAPCON 히스토리 데이터
export const mockKimbapconHistory: KimbapconHistory[] = [
  {
    id: "1",
    date: "2025-01-29",
    level: 4,
    previousLevel: 4,
    status: "DOUBLE TAKE • INCREASED INTELLIGENCE WATCH",
    trigger: "일일 정기 평가",
  },
  {
    id: "2",
    date: "2025-01-28",
    level: 4,
    previousLevel: 3,
    status: "DOUBLE TAKE • INCREASED INTELLIGENCE WATCH",
    trigger: "북한 미사일 발사 후 긴장 완화",
  },
  {
    id: "3",
    date: "2025-01-27",
    level: 3,
    previousLevel: 4,
    status: "ROUND HOUSE • ABOVE NORMAL READINESS",
    trigger: "북한 단거리 미사일 발사",
  },
  {
    id: "4",
    date: "2025-01-25",
    level: 4,
    previousLevel: 4,
    status: "DOUBLE TAKE • INCREASED INTELLIGENCE WATCH",
    trigger: "한미 연합훈련 종료",
  },
  {
    id: "5",
    date: "2025-01-20",
    level: 4,
    previousLevel: 3,
    status: "DOUBLE TAKE • INCREASED INTELLIGENCE WATCH",
    trigger: "남북 회담 무산 후 안정화",
  },
  {
    id: "6",
    date: "2025-01-18",
    level: 3,
    previousLevel: 4,
    status: "ROUND HOUSE • ABOVE NORMAL READINESS",
    trigger: "남북 고위급 회담 무산",
  },
  {
    id: "7",
    date: "2025-01-15",
    level: 4,
    previousLevel: 4,
    status: "DOUBLE TAKE • INCREASED INTELLIGENCE WATCH",
    trigger: "DMZ 인근 군사 훈련 실시",
  },
  {
    id: "8",
    date: "2025-01-10",
    level: 4,
    previousLevel: 5,
    status: "DOUBLE TAKE • INCREASED INTELLIGENCE WATCH",
    trigger: "한미 연합훈련 일정 발표",
  },
  {
    id: "9",
    date: "2025-01-05",
    level: 5,
    previousLevel: 5,
    status: "FADE OUT • NORMAL PEACETIME READINESS",
    trigger: "신년 평화 메시지 교환",
  },
  {
    id: "10",
    date: "2025-01-01",
    level: 5,
    previousLevel: 4,
    status: "FADE OUT • NORMAL PEACETIME READINESS",
    trigger: "신년 시작",
  },
];

// 주요 이벤트 데이터
export const mockMajorEvents: MajorEvent[] = [
  {
    id: "1",
    date: "2025-01-28",
    title: "북한 단거리 미사일 발사",
    description: "북한이 동해상으로 단거리 탄도미사일 2발을 발사했습니다.",
    type: "military",
    impact: "high",
    kimbapconEffect: -1,
  },
  {
    id: "2",
    date: "2025-01-27",
    title: "중국 대만해협 군사훈련",
    description: "중국 인민해방군이 대만해협에서 대규모 군사훈련을 실시했습니다.",
    type: "military",
    impact: "medium",
    kimbapconEffect: 0,
  },
  {
    id: "3",
    date: "2025-01-25",
    title: "미국 대북 특사 방한",
    description: "미국 국무부 대북 특사가 한국을 방문해 북핵 문제를 협의했습니다.",
    type: "political",
    impact: "medium",
    kimbapconEffect: 1,
  },
  {
    id: "4",
    date: "2025-01-20",
    title: "남북 고위급 회담 무산",
    description: "예정된 남북 고위급 회담이 북한 측 불참으로 무산되었습니다.",
    type: "political",
    impact: "high",
    kimbapconEffect: -1,
  },
  {
    id: "5",
    date: "2025-01-18",
    title: "일본 독도 영유권 재주장",
    description: "일본 정부가 독도 영유권을 재확인하는 성명을 발표했습니다.",
    type: "political",
    impact: "low",
    kimbapconEffect: 0,
  },
  {
    id: "6",
    date: "2025-01-15",
    title: "한미 연합훈련 시작",
    description: "한미 연합 군사훈련 '프리덤 실드'가 시작되었습니다.",
    type: "military",
    impact: "medium",
    kimbapconEffect: -1,
  },
  {
    id: "7",
    date: "2025-01-10",
    title: "북한 김정은 군사시설 시찰",
    description: "김정은 위원장이 전략미사일 사령부를 시찰했습니다.",
    type: "military",
    impact: "medium",
    kimbapconEffect: -1,
  },
  {
    id: "8",
    date: "2025-01-05",
    title: "신년 평화 메시지 교환",
    description: "남북이 신년을 맞아 평화 메시지를 교환했습니다.",
    type: "political",
    impact: "low",
    kimbapconEffect: 1,
  },
];

// 히스토리 조회 함수
export function getKimbapconHistoryByDays(days: number): KimbapconHistory[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return mockKimbapconHistory.filter(
    (entry) => new Date(entry.date) >= cutoffDate
  );
}

export function getMajorEventsByDays(days: number): MajorEvent[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return mockMajorEvents.filter(
    (event) => new Date(event.date) >= cutoffDate
  );
}
