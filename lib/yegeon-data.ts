import type {
  YeGeonUser,
  YeGeonMarket,
  YeGeonNotification,
  Trade,
  Comment,
  Category,
  ProbabilityPoint,
  LeagueTier,
  LeagueGroup,
  LeagueSeason,
} from "./yegeon-types";

function generateProbabilityHistory(
  current: number,
  days: number = 30,
): ProbabilityPoint[] {
  const points: ProbabilityPoint[] = [];
  const now = new Date();
  let prob = Math.max(
    0.05,
    Math.min(0.95, current + (Math.random() - 0.5) * 0.3),
  );

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    points.push({
      date: date.toISOString().split("T")[0],
      probability: Math.round(prob * 100) / 100,
    });
    const drift = (current - prob) * 0.1;
    const noise = (Math.random() - 0.5) * 0.08;
    prob = Math.max(0.02, Math.min(0.98, prob + drift + noise));
  }

  if (points.length > 0) {
    const lastIndex = points.length - 1;
    points[lastIndex] = { ...points[lastIndex], probability: current };
  }

  return points;
}

export const users: YeGeonUser[] = [
  {
    id: "u1",
    username: "kb_ham",
    displayName: "함경범",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=jinwoo",
    bio: "정치/경제 예측 전문가. 데이터 기반 분석을 좋아합니다.",
    createdAt: "2024-03-15",
    followersCount: 1247,
    followingCount: 89,
    totalTrades: 342,
    profitLoss: 28500,
    balance: 45200,
    investedAmount: 32800,
    netWorth: 78000,
  },
  {
    id: "u2",
    username: "soyeon_park",
    displayName: "박소연",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=soyeon",
    bio: "K-POP과 한류 문화 전문 트레이더 🎵",
    createdAt: "2024-06-20",
    followersCount: 892,
    followingCount: 156,
    totalTrades: 218,
    profitLoss: 15300,
    balance: 31500,
    investedAmount: 24100,
    netWorth: 55600,
  },
  {
    id: "u3",
    username: "minho_lee",
    displayName: "이민호",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=minho",
    bio: "테크 산업 분석가. AI/반도체 마켓 집중 투자.",
    createdAt: "2024-01-10",
    followersCount: 2103,
    followingCount: 45,
    totalTrades: 567,
    profitLoss: 52100,
    balance: 89300,
    investedAmount: 67200,
    netWorth: 156500,
  },
  {
    id: "u4",
    username: "yuna_choi",
    displayName: "최유나",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=yuna",
    bio: "스포츠 베팅 + 국제정세. 축구 예측 적중률 78%.",
    createdAt: "2024-08-05",
    followersCount: 634,
    followingCount: 201,
    totalTrades: 189,
    profitLoss: -4200,
    balance: 18900,
    investedAmount: 15700,
    netWorth: 34600,
  },
  {
    id: "u5",
    username: "hyunwoo_jung",
    displayName: "정현우",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=hyunwoo",
    bio: "주식 시장 & 거시경제 예측. 전직 증권사 애널리스트.",
    createdAt: "2024-02-28",
    followersCount: 3421,
    followingCount: 32,
    totalTrades: 891,
    profitLoss: 98700,
    balance: 124500,
    investedAmount: 95800,
    netWorth: 220300,
  },
];

export const markets: YeGeonMarket[] = [
  {
    id: "m1",
    slug: "president-approval-40-percent-2026",
    title: "2026년 대한민국 대통령 지지율이 40%를 넘길까?",
    description:
      "현재 대통령의 갤럽코리아 기준 지지율이 2026년 12월 31일까지 40%를 넘기는 주간 조사 결과가 1회 이상 발표되면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "politics",
    creatorUsername: "kb_ham",
    createdAt: "2025-11-01",
    closeDate: "2026-12-31",
    probability: 0.28,
    volume: 4520000,
    totalTraders: 1893,
    tags: ["정치", "대통령", "지지율"],
    probabilityHistory: generateProbabilityHistory(0.28),
    isResolved: false,
  },
  {
    id: "m2",
    slug: "samsung-stock-100k-2026",
    title: "삼성전자 주가가 2026년 말까지 10만원을 돌파할까?",
    description:
      "삼성전자 보통주(005930) 종가 기준으로 2026년 12월 30일까지 100,000원 이상을 기록하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "hyunwoo_jung",
    createdAt: "2025-12-15",
    closeDate: "2026-12-30",
    probability: 0.42,
    volume: 8970000,
    totalTraders: 3241,
    tags: ["주식", "삼성전자", "반도체"],
    probabilityHistory: generateProbabilityHistory(0.42),
    isResolved: false,
  },
  {
    id: "m3",
    slug: "korea-worldcup-qualifier-first-2026",
    title: "2026 FIFA 월드컵 아시아 예선에서 한국이 1위로 통과할까?",
    description:
      "2026 FIFA 월드컵 아시아 최종예선 조별리그에서 대한민국이 조 1위로 본선 진출하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "sports",
    creatorUsername: "yuna_choi",
    createdAt: "2025-09-20",
    closeDate: "2026-06-15",
    probability: 0.65,
    volume: 6340000,
    totalTraders: 2567,
    tags: ["축구", "월드컵", "대표팀"],
    probabilityHistory: generateProbabilityHistory(0.65),
    isResolved: false,
  },
  {
    id: "m4",
    slug: "korean-drama-netflix-global-first-2026",
    title: "넷플릭스에서 한국 드라마가 2026년 글로벌 1위를 차지할까?",
    description:
      "2026년 넷플릭스 글로벌 Top 10 주간 차트(TV 비영어 부문)에서 한국 드라마가 1위를 1회 이상 차지하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "culture",
    creatorUsername: "soyeon_park",
    createdAt: "2025-10-10",
    closeDate: "2026-12-31",
    probability: 0.55,
    volume: 3210000,
    totalTraders: 1456,
    tags: ["넷플릭스", "K-드라마", "한류"],
    probabilityHistory: generateProbabilityHistory(0.55),
    isResolved: false,
  },
  {
    id: "m5",
    slug: "korea-birth-rate-rebound-2026",
    title: "2026년 한국의 출산율이 반등할까?",
    description:
      "통계청 발표 2026년 합계출산율이 2025년 대비 상승(소수점 셋째자리 이상)하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "politics",
    creatorUsername: "kb_ham",
    createdAt: "2025-08-01",
    closeDate: "2027-02-28",
    probability: 0.12,
    volume: 2890000,
    totalTraders: 987,
    tags: ["인구", "출산율", "사회"],
    probabilityHistory: generateProbabilityHistory(0.12),
    isResolved: false,
  },
  {
    id: "m6",
    slug: "kakaobank-market-cap-30t-2026",
    title: "카카오뱅크가 2026년까지 시가총액 30조를 넘길까?",
    description:
      "카카오뱅크(323410) 시가총액이 2026년 12월 31일까지 30조원을 1일이라도 넘기면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "hyunwoo_jung",
    createdAt: "2025-11-20",
    closeDate: "2026-12-31",
    probability: 0.18,
    volume: 1560000,
    totalTraders: 678,
    tags: ["핀테크", "카카오", "은행"],
    probabilityHistory: generateProbabilityHistory(0.18),
    isResolved: false,
  },
  {
    id: "m7",
    slug: "inter-korean-summit-2026",
    title: "2026년 안에 남북 정상회담이 열릴까?",
    description:
      "2026년 12월 31일까지 남한과 북한 정상 간의 공식 정상회담이 개최되면 YES로 결의합니다. 비공식 접촉은 포함하지 않습니다.",
    type: "binary",
    status: "open",
    category: "politics",
    creatorUsername: "minho_lee",
    createdAt: "2025-07-15",
    closeDate: "2026-12-31",
    probability: 0.08,
    volume: 5670000,
    totalTraders: 2134,
    tags: ["남북관계", "외교", "통일"],
    probabilityHistory: generateProbabilityHistory(0.08),
    isResolved: false,
  },
  {
    id: "m8",
    slug: "bts-full-comeback-2026",
    title: "BTS 완전체 컴백이 2026년에 이루어질까?",
    description:
      "BTS 7인 완전체로 신규 앨범 발매 또는 공식 콘서트를 2026년 12월 31일까지 개최하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "culture",
    creatorUsername: "soyeon_park",
    createdAt: "2025-06-01",
    closeDate: "2026-12-31",
    probability: 0.72,
    volume: 12450000,
    totalTraders: 5678,
    tags: ["BTS", "K-POP", "컴백"],
    probabilityHistory: generateProbabilityHistory(0.72),
    isResolved: false,
  },
  {
    id: "m9",
    slug: "korean-person-of-year-2026",
    title: "2026년 올해의 한국인은 누가 될까?",
    description:
      "타임지 선정 '올해의 인물' 후보 중 한국인이 선정될 경우, 해당 인물로 결의합니다. 선정되지 않으면 '해당 없음'으로 결의됩니다.",
    type: "multiple_choice",
    status: "open",
    category: "culture",
    creatorUsername: "kb_ham",
    createdAt: "2025-10-01",
    closeDate: "2026-12-15",
    probability: 0.35,
    volume: 7890000,
    totalTraders: 3456,
    tags: ["타임지", "인물", "한국"],
    options: [
      { id: "opt1", label: "손흥민", probability: 0.35, color: "#14b8a6" },
      { id: "opt2", label: "봉준호", probability: 0.25, color: "#8b5cf6" },
      { id: "opt3", label: "BTS", probability: 0.15, color: "#f59e0b" },
      { id: "opt4", label: "이미경", probability: 0.1, color: "#ef4444" },
      { id: "opt5", label: "해당 없음", probability: 0.15, color: "#64748b" },
    ],
    probabilityHistory: generateProbabilityHistory(0.35),
    isResolved: false,
  },
  {
    id: "m10",
    slug: "top-korean-stock-2026",
    title: "2026년 가장 많이 오를 한국 주식은?",
    description:
      "2026년 1월 2일 시가 대비 12월 30일 종가 기준 상승률이 가장 높은 종목으로 결의합니다.",
    type: "multiple_choice",
    status: "open",
    category: "business",
    creatorUsername: "hyunwoo_jung",
    createdAt: "2025-12-28",
    closeDate: "2026-12-30",
    probability: 0.3,
    volume: 15670000,
    totalTraders: 4892,
    tags: ["주식", "투자", "코스피"],
    options: [
      { id: "opt1", label: "삼성전자", probability: 0.3, color: "#3b82f6" },
      { id: "opt2", label: "SK하이닉스", probability: 0.28, color: "#14b8a6" },
      { id: "opt3", label: "네이버", probability: 0.18, color: "#22c55e" },
      { id: "opt4", label: "카카오", probability: 0.12, color: "#f59e0b" },
      { id: "opt5", label: "기타", probability: 0.12, color: "#64748b" },
    ],
    probabilityHistory: generateProbabilityHistory(0.3),
    isResolved: false,
  },
  {
    id: "m11",
    slug: "korea-ai-regulation-2026",
    title: "한국이 2026년 안에 AI 규제법을 통과시킬까?",
    description:
      "국회에서 인공지능 관련 규제 법안이 본회의를 통과하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "technology",
    creatorUsername: "minho_lee",
    createdAt: "2025-11-05",
    closeDate: "2026-12-31",
    probability: 0.38,
    volume: 2340000,
    totalTraders: 1023,
    tags: ["AI", "규제", "국회"],
    probabilityHistory: generateProbabilityHistory(0.38),
    isResolved: false,
  },
  {
    id: "m12",
    slug: "esports-olympics-medal-2026",
    title: "한국 e스포츠 대표팀이 2026 아시안게임에서 금메달을 딸까?",
    description:
      "2026 아이치-나고야 아시안게임 e스포츠 종목에서 한국이 금메달 1개 이상 획득하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "sports",
    creatorUsername: "yuna_choi",
    createdAt: "2025-09-01",
    closeDate: "2026-09-30",
    probability: 0.82,
    volume: 4120000,
    totalTraders: 1876,
    tags: ["e스포츠", "아시안게임", "게임"],
    probabilityHistory: generateProbabilityHistory(0.82),
    isResolved: false,
  },
  {
    id: "m13",
    slug: "kpop-billboard-hot100-2026",
    title: "K-POP 아티스트가 2026년에 빌보드 HOT 100 1위를 할까?",
    description:
      "2026년 12월 31일까지 K-POP 아티스트(솔로/그룹)의 곡이 빌보드 HOT 100 차트 1위를 기록하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "culture",
    creatorUsername: "soyeon_park",
    createdAt: "2025-11-10",
    closeDate: "2026-12-31",
    probability: 0.58,
    volume: 5430000,
    totalTraders: 2345,
    tags: ["K-POP", "빌보드", "음악"],
    probabilityHistory: generateProbabilityHistory(0.58),
    isResolved: false,
  },
  {
    id: "m14",
    slug: "digital-won-pilot-2026",
    title: "디지털 원화(CBDC) 시범 운영이 2026년에 시작될까?",
    description:
      "한국은행이 2026년 12월 31일까지 디지털 원화 시범 운영을 공식 개시하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "hyunwoo_jung",
    createdAt: "2025-10-20",
    closeDate: "2026-12-31",
    probability: 0.22,
    volume: 1230000,
    totalTraders: 567,
    tags: ["CBDC", "디지털화폐", "한국은행"],
    probabilityHistory: generateProbabilityHistory(0.22),
    isResolved: false,
  },
  {
    id: "m15",
    slug: "semiconductor-export-100b-2026",
    title: "한국 반도체 수출이 2026년에 1000억달러를 돌파할까?",
    description:
      "산업통상자원부 발표 기준 2026년 반도체 연간 수출액이 1000억달러를 초과하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "minho_lee",
    createdAt: "2025-12-01",
    closeDate: "2027-01-31",
    probability: 0.52,
    volume: 6780000,
    totalTraders: 2890,
    tags: ["반도체", "수출", "무역"],
    probabilityHistory: generateProbabilityHistory(0.52),
    isResolved: false,
  },
  {
    id: "m16",
    slug: "gdp-growth-3-percent-2026",
    title: "2026년 한국 GDP 성장률이 3%를 넘길까?",
    description:
      "한국은행 발표 2026년 연간 실질 GDP 성장률이 3.0% 이상이면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "hyunwoo_jung",
    createdAt: "2025-11-15",
    closeDate: "2027-03-31",
    probability: 0.35,
    volume: 3450000,
    totalTraders: 1234,
    tags: ["GDP", "경제성장", "거시경제"],
    probabilityHistory: generateProbabilityHistory(0.35),
    isResolved: false,
  },
  {
    id: "m17",
    slug: "housing-price-15-2026",
    title: "서울 아파트 평균 매매가가 15억원을 돌파할까?",
    description:
      "KB부동산 기준 서울 아파트 평균 매매가격이 2026년 12월 31일까지 15억원을 초과하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "kb_ham",
    createdAt: "2025-10-05",
    closeDate: "2026-12-31",
    probability: 0.33,
    volume: 4560000,
    totalTraders: 1987,
    tags: ["부동산", "아파트", "서울"],
    probabilityHistory: generateProbabilityHistory(0.33),
    isResolved: false,
  },
  {
    id: "m18",
    slug: "kospi-3000-2026",
    title: "코스피 지수가 2026년에 3000을 돌파할까?",
    description:
      "코스피 종가가 2026년 12월 30일까지 3000 이상을 1일이라도 기록하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "hyunwoo_jung",
    createdAt: "2025-12-20",
    closeDate: "2026-12-30",
    probability: 0.30,
    volume: 7890000,
    totalTraders: 3456,
    tags: ["주식", "코스피", "증시"],
    probabilityHistory: generateProbabilityHistory(0.30),
    isResolved: false,
  },
  {
    id: "m19",
    slug: "ev-market-share-15-2026",
    title: "한국 내 전기차 판매 점유율이 15%를 넘길까?",
    description:
      "2026년 국내 신차 판매 중 전기차(BEV) 비중이 연간 기준 15%를 초과하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "technology",
    creatorUsername: "minho_lee",
    createdAt: "2025-09-15",
    closeDate: "2027-01-31",
    probability: 0.48,
    volume: 2340000,
    totalTraders: 1023,
    tags: ["전기차", "자동차", "친환경"],
    probabilityHistory: generateProbabilityHistory(0.48),
    isResolved: false,
  },
  {
    id: "m20",
    slug: "naver-ai-search-50-2026",
    title: "네이버 AI 검색 점유율이 50%를 돌파할까?",
    description:
      "네이버 AI 검색(큐:) 사용 비율이 전체 검색의 50%를 넘기는 월간 리포트가 발표되면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "technology",
    creatorUsername: "minho_lee",
    createdAt: "2025-11-25",
    closeDate: "2026-12-31",
    probability: 0.31,
    volume: 1890000,
    totalTraders: 876,
    tags: ["AI", "네이버", "검색"],
    probabilityHistory: generateProbabilityHistory(0.31),
    isResolved: false,
  },
  {
    id: "m21",
    slug: "space-launch-nuri-2026",
    title: "누리호 상업 발사가 2026년에 성공할까?",
    description:
      "한국형 발사체 누리호(KSLV-II)의 상업 위성 탑재 발사가 2026년 내 성공하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "technology",
    creatorUsername: "minho_lee",
    createdAt: "2025-08-20",
    closeDate: "2026-12-31",
    probability: 0.68,
    volume: 2670000,
    totalTraders: 1234,
    tags: ["우주", "누리호", "발사체"],
    probabilityHistory: generateProbabilityHistory(0.68),
    isResolved: false,
  },
  {
    id: "m22",
    slug: "son-heungmin-20-goals-2026",
    title: "손흥민이 2025-26 시즌 20골을 달성할까?",
    description:
      "손흥민 선수가 2025-26 EPL 시즌 공식 리그 경기에서 20골 이상 기록하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "sports",
    creatorUsername: "yuna_choi",
    createdAt: "2025-08-15",
    closeDate: "2026-05-31",
    probability: 0.45,
    volume: 5670000,
    totalTraders: 2345,
    tags: ["손흥민", "EPL", "축구"],
    probabilityHistory: generateProbabilityHistory(0.45),
    isResolved: false,
  },
  {
    id: "m23",
    slug: "blackpink-world-tour-2026",
    title: "블랙핑크가 2026년에 월드투어를 개최할까?",
    description:
      "블랙핑크 4인이 참여하는 공식 월드투어가 2026년 내 1회 이상 공연되면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "culture",
    creatorUsername: "soyeon_park",
    createdAt: "2025-07-20",
    closeDate: "2026-12-31",
    probability: 0.65,
    volume: 8900000,
    totalTraders: 4567,
    tags: ["블랙핑크", "K-POP", "콘서트"],
    probabilityHistory: generateProbabilityHistory(0.65),
    isResolved: false,
  },
  {
    id: "m24",
    slug: "korean-oscar-2026",
    title: "한국 영화가 2026년 아카데미 시상식에서 수상할까?",
    description:
      "제98회 아카데미 시상식에서 한국 영화 또는 한국인 감독/배우가 수상하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "culture",
    creatorUsername: "soyeon_park",
    createdAt: "2025-10-01",
    closeDate: "2026-03-31",
    probability: 0.28,
    volume: 3210000,
    totalTraders: 1456,
    tags: ["아카데미", "영화", "한류"],
    probabilityHistory: generateProbabilityHistory(0.28),
    isResolved: false,
  },
  {
    id: "m25",
    slug: "sk-hynix-record-profit-2026",
    title: "SK하이닉스가 2026년에 사상 최대 실적을 기록할까?",
    description:
      "SK하이닉스 2026년 연간 영업이익이 역대 최고치를 갱신하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "hyunwoo_jung",
    createdAt: "2025-12-10",
    closeDate: "2027-01-31",
    probability: 0.72,
    volume: 5430000,
    totalTraders: 2345,
    tags: ["SK하이닉스", "HBM", "반도체"],
    probabilityHistory: generateProbabilityHistory(0.72),
    isResolved: false,
  },
  {
    id: "m26",
    slug: "crypto-tax-2026",
    title: "가상자산 과세가 2026년에 시행될까?",
    description:
      "2026년 내 가상자산 양도소득에 대한 과세가 실제로 시행 개시되면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "kb_ham",
    createdAt: "2025-09-10",
    closeDate: "2026-12-31",
    probability: 0.62,
    volume: 4560000,
    totalTraders: 2134,
    tags: ["가상자산", "세금", "규제"],
    probabilityHistory: generateProbabilityHistory(0.62),
    isResolved: false,
  },
  {
    id: "m27",
    slug: "pension-reform-2026",
    title: "국민연금 개혁안이 2026년에 국회를 통과할까?",
    description:
      "국민연금 보험료율 또는 지급률 변경을 포함한 개혁 법안이 2026년 내 국회 본회의를 통과하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "politics",
    creatorUsername: "kb_ham",
    createdAt: "2025-08-25",
    closeDate: "2026-12-31",
    probability: 0.28,
    volume: 3890000,
    totalTraders: 1567,
    tags: ["연금", "개혁", "국회"],
    probabilityHistory: generateProbabilityHistory(0.28),
    isResolved: false,
  },
  {
    id: "m28",
    slug: "climate-carbon-neutral-2026",
    title: "탄소중립 이행법이 2026년에 강화될까?",
    description:
      "2026년 내 탄소중립 관련 법률 개정안이 국회를 통과하여 규제가 강화되면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "politics",
    creatorUsername: "minho_lee",
    createdAt: "2025-11-01",
    closeDate: "2026-12-31",
    probability: 0.33,
    volume: 1230000,
    totalTraders: 567,
    tags: ["탄소중립", "환경", "기후"],
    probabilityHistory: generateProbabilityHistory(0.33),
    isResolved: false,
  },
  {
    id: "m29",
    slug: "population-below-52m-2026",
    title: "한국 인구가 5200만 이하로 감소할까?",
    description:
      "통계청 발표 2026년 말 주민등록인구가 5200만명 미만이면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "politics",
    creatorUsername: "kb_ham",
    createdAt: "2025-07-01",
    closeDate: "2027-02-28",
    probability: 0.45,
    volume: 2340000,
    totalTraders: 987,
    tags: ["인구", "인구감소", "사회"],
    probabilityHistory: generateProbabilityHistory(0.45),
    isResolved: false,
  },
  {
    id: "m30",
    slug: "startup-unicorn-3-2026",
    title: "2026년에 한국 신규 유니콘 기업이 3개 이상 탄생할까?",
    description:
      "2026년 내 기업가치 1조원 이상으로 평가받는 한국 스타트업이 신규 3개 이상 등장하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "hyunwoo_jung",
    createdAt: "2025-12-05",
    closeDate: "2026-12-31",
    probability: 0.35,
    volume: 1890000,
    totalTraders: 876,
    tags: ["스타트업", "유니콘", "벤처"],
    probabilityHistory: generateProbabilityHistory(0.35),
    isResolved: false,
  },
  {
    id: "m31",
    slug: "wbc-semifinal-korea-2026",
    title: "한국이 2026 WBC에서 4강에 진출할까?",
    description:
      "2026 월드 베이스볼 클래식에서 한국 대표팀이 4강(준결승) 이상 진출하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "sports",
    creatorUsername: "yuna_choi",
    createdAt: "2025-11-20",
    closeDate: "2026-03-31",
    probability: 0.55,
    volume: 3450000,
    totalTraders: 1567,
    tags: ["WBC", "야구", "대표팀"],
    probabilityHistory: generateProbabilityHistory(0.55),
    isResolved: false,
  },
  {
    id: "m32",
    slug: "hbm-market-share-50-2026",
    title: "한국 기업의 HBM 시장 점유율이 50%를 넘길까?",
    description:
      "SK하이닉스+삼성전자의 HBM 글로벌 시장 점유율이 2026년 내 50%를 초과하는 분기 보고가 나오면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "technology",
    creatorUsername: "minho_lee",
    createdAt: "2025-12-15",
    closeDate: "2026-12-31",
    probability: 0.68,
    volume: 4560000,
    totalTraders: 2134,
    tags: ["HBM", "메모리", "반도체"],
    probabilityHistory: generateProbabilityHistory(0.68),
    isResolved: false,
  },
  {
    id: "m33",
    slug: "unemployment-below-3-2026",
    title: "2026년 한국 실업률이 3% 이하를 유지할까?",
    description:
      "통계청 발표 2026년 연평균 실업률이 3.0% 이하이면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "hyunwoo_jung",
    createdAt: "2025-10-10",
    closeDate: "2027-02-28",
    probability: 0.61,
    volume: 1560000,
    totalTraders: 678,
    tags: ["실업률", "고용", "경제"],
    probabilityHistory: generateProbabilityHistory(0.61),
    isResolved: false,
  },
  {
    id: "m34",
    slug: "ship-order-first-2026",
    title: "한국이 2026년 조선 수주량 세계 1위를 차지할까?",
    description:
      "클락슨리서치 기준 2026년 연간 선박 수주량에서 한국이 세계 1위를 기록하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "hyunwoo_jung",
    createdAt: "2025-09-05",
    closeDate: "2027-01-31",
    probability: 0.72,
    volume: 2340000,
    totalTraders: 987,
    tags: ["조선", "수주", "산업"],
    probabilityHistory: generateProbabilityHistory(0.72),
    isResolved: false,
  },
  {
    id: "m35",
    slug: "k-food-export-10b-2026",
    title: "K-푸드 수출이 100억달러를 돌파할까?",
    description:
      "농림축산식품부 발표 2026년 K-푸드 연간 수출액이 100억달러를 초과하면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "business",
    creatorUsername: "soyeon_park",
    createdAt: "2025-10-15",
    closeDate: "2027-01-31",
    probability: 0.40,
    volume: 1230000,
    totalTraders: 567,
    tags: ["K-푸드", "수출", "식품"],
    probabilityHistory: generateProbabilityHistory(0.40),
    isResolved: false,
  },
];

export const trades: Trade[] = [
  {
    id: "t1",
    marketId: "m8",
    marketTitle: "BTS 완전체 컴백이 2026년에 이루어질까?",
    marketSlug: "bts-full-comeback-2026",
    username: "kb_ham",
    direction: "YES",
    amount: 5000,
    probability: 0.68,
    timestamp: "2026-02-07T09:30:00Z",
  },
  {
    id: "t2",
    marketId: "m2",
    marketTitle: "삼성전자 주가가 2026년 말까지 10만원을 돌파할까?",
    marketSlug: "samsung-stock-100k-2026",
    username: "kb_ham",
    direction: "YES",
    amount: 12000,
    probability: 0.39,
    timestamp: "2026-02-06T14:20:00Z",
  },
  {
    id: "t3",
    marketId: "m1",
    marketTitle: "2026년 대한민국 대통령 지지율이 40%를 넘길까?",
    marketSlug: "president-approval-40-percent-2026",
    username: "kb_ham",
    direction: "NO",
    amount: 8000,
    probability: 0.31,
    timestamp: "2026-02-05T11:45:00Z",
  },
  {
    id: "t4",
    marketId: "m3",
    marketTitle: "2026 FIFA 월드컵 아시아 예선에서 한국이 1위로 통과할까?",
    marketSlug: "korea-worldcup-qualifier-first-2026",
    username: "kb_ham",
    direction: "YES",
    amount: 15000,
    probability: 0.62,
    timestamp: "2026-02-04T16:10:00Z",
  },
  {
    id: "t5",
    marketId: "m5",
    marketTitle: "2026년 한국의 출산율이 반등할까?",
    marketSlug: "korea-birth-rate-rebound-2026",
    username: "kb_ham",
    direction: "NO",
    amount: 20000,
    probability: 0.15,
    timestamp: "2026-02-03T08:55:00Z",
  },
  {
    id: "t6",
    marketId: "m7",
    marketTitle: "2026년 안에 남북 정상회담이 열릴까?",
    marketSlug: "inter-korean-summit-2026",
    username: "kb_ham",
    direction: "NO",
    amount: 10000,
    probability: 0.1,
    timestamp: "2026-02-02T13:30:00Z",
  },
  {
    id: "t7",
    marketId: "m9",
    marketTitle: "2026년 올해의 한국인은 누가 될까?",
    marketSlug: "korean-person-of-year-2026",
    username: "kb_ham",
    direction: "YES",
    amount: 7000,
    probability: 0.32,
    timestamp: "2026-02-01T10:20:00Z",
    optionLabel: "손흥민",
  },
  {
    id: "t8",
    marketId: "m11",
    marketTitle: "한국이 2026년 안에 AI 규제법을 통과시킬까?",
    marketSlug: "korea-ai-regulation-2026",
    username: "kb_ham",
    direction: "YES",
    amount: 6000,
    probability: 0.35,
    timestamp: "2026-01-30T15:40:00Z",
  },
  {
    id: "t9",
    marketId: "m12",
    marketTitle: "한국 e스포츠 대표팀이 2026 아시안게임에서 금메달을 딸까?",
    marketSlug: "esports-olympics-medal-2026",
    username: "soyeon_park",
    direction: "YES",
    amount: 9000,
    probability: 0.79,
    timestamp: "2026-02-06T10:15:00Z",
  },
  {
    id: "t10",
    marketId: "m4",
    marketTitle: "넷플릭스에서 한국 드라마가 2026년 글로벌 1위를 차지할까?",
    marketSlug: "korean-drama-netflix-global-first-2026",
    username: "soyeon_park",
    direction: "YES",
    amount: 11000,
    probability: 0.52,
    timestamp: "2026-02-05T09:00:00Z",
  },
];

export const comments: Comment[] = [
  {
    id: "c1",
    marketId: "m8",
    username: "soyeon_park",
    displayName: "박소연",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=soyeon",
    content:
      "진 전역 후 활동 시작했고, 나머지 멤버들도 속속 전역 중이라 완전체 가능성 매우 높다고 봅니다. 다만 개인 활동 스케줄 조율이 관건.",
    timestamp: "2026-02-06T15:30:00Z",
    likes: 45,
    replies: [
      {
        id: "c1r1",
        marketId: "m8",
        username: "kb_ham",
        displayName: "함경범",
        avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=jinwoo",
        content:
          "동의합니다. 하이브 실적 발표에서도 2026년 그룹 활동 언급이 있었어요.",
        timestamp: "2026-02-06T16:00:00Z",
        likes: 23,
        replies: [],
      },
    ],
  },
  {
    id: "c2",
    marketId: "m8",
    username: "minho_lee",
    displayName: "이민호",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=minho",
    content:
      "하이브 주가 차트 봐도 완전체 기대감이 반영되고 있습니다. 72%는 합리적인 확률이라고 생각해요.",
    timestamp: "2026-02-05T11:20:00Z",
    likes: 31,
    replies: [],
  },
  {
    id: "c3",
    marketId: "m8",
    username: "yuna_choi",
    displayName: "최유나",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=yuna",
    content:
      "단, '완전체'의 정의가 7인 전원이 참여해야 하는 건데, 개인 일정 문제로 6인 활동 가능성도 있지 않을까요?",
    timestamp: "2026-02-04T09:15:00Z",
    likes: 18,
    replies: [
      {
        id: "c3r1",
        marketId: "m8",
        username: "soyeon_park",
        displayName: "박소연",
        avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=soyeon",
        content:
          "마켓 설명에 '7인 완전체'로 명시되어 있어서, 6인이면 NO로 결의될 겁니다.",
        timestamp: "2026-02-04T10:00:00Z",
        likes: 12,
        replies: [],
      },
    ],
  },
  {
    id: "c4",
    marketId: "m2",
    username: "hyunwoo_jung",
    displayName: "정현우",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=hyunwoo",
    content:
      "HBM 수요 증가와 AI 반도체 사이클을 고려하면 충분히 가능합니다. 다만 글로벌 경기 침체 리스크가 변수.",
    timestamp: "2026-02-06T14:00:00Z",
    likes: 67,
    replies: [],
  },
  {
    id: "c5",
    marketId: "m2",
    username: "minho_lee",
    displayName: "이민호",
    avatarUrl: "https://api.dicebear.com/9.x/thumbs/svg?seed=minho",
    content:
      "2024년에도 '삼전 10만전자' 기대가 있었지만 실패했죠. 이번에는 HBM3E 양산이 본격화되는 시점이라 다를 수 있습니다.",
    timestamp: "2026-02-05T16:30:00Z",
    likes: 42,
    replies: [],
  },
];

export function getCurrentUser(): YeGeonUser {
  return users[0];
}

export function getUserByUsername(username: string): YeGeonUser | undefined {
  return users.find((u) => u.username === username);
}

export function getMarketBySlug(slug: string): YeGeonMarket | undefined {
  return markets.find((m) => m.slug === slug);
}

export function getMarketsByCategory(category: Category): YeGeonMarket[] {
  if (category === "all") return markets;
  return markets.filter((m) => m.category === category);
}

export function getTradesByUsername(username: string): Trade[] {
  return trades.filter((t) => t.username === username);
}

export function getCommentsByMarketId(marketId: string): Comment[] {
  return comments.filter((c) => c.marketId === marketId);
}

export function getRelatedMarkets(
  currentSlug: string,
  limit: number = 3,
): YeGeonMarket[] {
  const current = getMarketBySlug(currentSlug);
  if (!current) return markets.slice(0, limit);

  return markets
    .filter((m) => m.slug !== currentSlug)
    .filter(
      (m) =>
        m.category === current.category ||
        m.tags.some((t) => current.tags.includes(t)),
    )
    .slice(0, limit);
}

export function formatVolume(volume: number, locale = "ko"): string {
  if (volume >= 100000000) {
    return `${(volume / 100000000).toFixed(1)}억`;
  }
  if (volume >= 10000) {
    return `${Math.floor(volume / 10000)}만`;
  }
  return volume.toLocaleString(locale === "ko" ? "ko-KR" : "en-US");
}

export function formatYeGeonCurrency(amount: number, locale = "ko"): string {
  return `₩${amount.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}`;
}

export const notifications: YeGeonNotification[] = [
  {
    id: "n1",
    type: "trade",
    fromUsername: "soyeon_park",
    marketId: "m8",
    marketTitle: "BTS 완전체 컴백이 2026년에 이루어질까?",
    message: "박소연님이 YES에 ₩9,000을 베팅했습니다",
    timestamp: "2026-02-18T08:30:00Z",
    isRead: false,
  },
  {
    id: "n2",
    type: "comment",
    fromUsername: "minho_lee",
    marketId: "m2",
    marketTitle: "삼성전자 주가가 2026년 말까지 10만원을 돌파할까?",
    message: "이민호님이 댓글을 남겼습니다: \"HBM3E 양산이 본격화되는 시점...\"",
    timestamp: "2026-02-18T07:15:00Z",
    isRead: false,
  },
  {
    id: "n3",
    type: "reply",
    fromUsername: "hyunwoo_jung",
    marketId: "m2",
    marketTitle: "삼성전자 주가가 2026년 말까지 10만원을 돌파할까?",
    message: "정현우님이 회원님의 댓글에 답글을 남겼습니다",
    timestamp: "2026-02-18T06:00:00Z",
    isRead: false,
  },
  {
    id: "n4",
    type: "follow",
    fromUsername: "yuna_choi",
    message: "최유나님이 회원님을 팔로우하기 시작했습니다",
    timestamp: "2026-02-17T22:45:00Z",
    isRead: false,
  },
  {
    id: "n5",
    type: "trade",
    fromUsername: "minho_lee",
    marketId: "m11",
    marketTitle: "한국이 2026년 안에 AI 규제법을 통과시킬까?",
    message: "이민호님이 YES에 ₩15,000을 베팅했습니다",
    timestamp: "2026-02-17T18:20:00Z",
    isRead: true,
  },
  {
    id: "n6",
    type: "comment",
    fromUsername: "soyeon_park",
    marketId: "m4",
    marketTitle: "넷플릭스에서 한국 드라마가 2026년 글로벌 1위를 차지할까?",
    message: "박소연님이 댓글을 남겼습니다: \"최근 넷플릭스 트렌드를 보면...\"",
    timestamp: "2026-02-17T14:10:00Z",
    isRead: true,
  },
  {
    id: "n7",
    type: "follow",
    fromUsername: "hyunwoo_jung",
    message: "정현우님이 회원님을 팔로우하기 시작했습니다",
    timestamp: "2026-02-17T10:30:00Z",
    isRead: true,
  },
  {
    id: "n8",
    type: "trade",
    fromUsername: "yuna_choi",
    marketId: "m3",
    marketTitle: "2026 FIFA 월드컵 아시아 예선에서 한국이 1위로 통과할까?",
    message: "최유나님이 YES에 ₩20,000을 베팅했습니다",
    timestamp: "2026-02-16T21:00:00Z",
    isRead: true,
  },
  {
    id: "n9",
    type: "reply",
    fromUsername: "soyeon_park",
    marketId: "m8",
    marketTitle: "BTS 완전체 컴백이 2026년에 이루어질까?",
    message: "박소연님이 회원님의 댓글에 답글을 남겼습니다",
    timestamp: "2026-02-16T16:45:00Z",
    isRead: true,
  },
  {
    id: "n10",
    type: "comment",
    fromUsername: "minho_lee",
    marketId: "m7",
    marketTitle: "2026년 안에 남북 정상회담이 열릴까?",
    message: "이민호님이 댓글을 남겼습니다: \"외교 채널이 다시 열릴 가능성은...\"",
    timestamp: "2026-02-16T09:20:00Z",
    isRead: true,
  },
];

export function getNotifications(): YeGeonNotification[] {
  return notifications;
}

export function getUnreadNotificationCount(): number {
  return notifications.filter((n) => !n.isRead).length;
}

export function getCategoriesWithCounts(): { category: Category; count: number }[] {
  const categoryList: Category[] = ["politics", "technology", "sports", "culture", "business", "fun"];
  return categoryList
    .map((category) => ({
      category,
      count: markets.filter((m) => m.category === category).length,
    }))
    .filter((c) => c.count > 0);
}

// ===== League Data =====

export const LEAGUE_TIERS: LeagueTier[] = [
  "master",
  "diamond",
  "platinum",
  "gold",
  "silver",
  "bronze",
];

export const TIER_EMOJIS: Record<LeagueTier, string> = {
  master: "🏆",
  diamond: "💎",
  platinum: "🪙",
  gold: "🥇",
  silver: "🥈",
  bronze: "🥉",
};

export const TIER_COLORS: Record<LeagueTier, string> = {
  master: "#e11d48",
  diamond: "#6366f1",
  platinum: "#06b6d4",
  gold: "#eab308",
  silver: "#94a3b8",
  bronze: "#d97706",
};

export const CURRENT_SEASON: LeagueSeason = {
  number: 12,
  month: "2월",
  endDate: "2026-02-28T23:59:59Z",
};

const CURRENT_USER_TIER: LeagueTier = "silver";
const CURRENT_USER_GROUP = "영리한 독수리";

export const leagueGroups: Record<LeagueTier, LeagueGroup[]> = {
  master: [
    {
      id: "master-1",
      name: "전설의 예언자",
      tier: "master",
      promotionLine: 0,
      members: [
        { rank: 1, username: "hyunwoo_jung", manaEarned: 98700 },
        { rank: 2, username: "minho_lee", manaEarned: 52100 },
      ],
    },
  ],
  diamond: [
    {
      id: "diamond-1",
      name: "빛나는 수정",
      tier: "diamond",
      promotionLine: 2,
      members: [
        { rank: 1, username: "trader_kim", manaEarned: 41200 },
        { rank: 2, username: "forecast_pro", manaEarned: 38900 },
        { rank: 3, username: "data_guru", manaEarned: 29100 },
        { rank: 4, username: "market_owl", manaEarned: 21500 },
        { rank: 5, username: "signal_fox", manaEarned: 18700 },
      ],
    },
  ],
  platinum: [
    {
      id: "plat-1",
      name: "예리한 매",
      tier: "platinum",
      promotionLine: 2,
      members: [
        { rank: 1, username: "stat_master", manaEarned: 22800 },
        { rank: 2, username: "prob_ace", manaEarned: 19400 },
        { rank: 3, username: "insight_park", manaEarned: 14600 },
        { rank: 4, username: "quant_lee", manaEarned: 11200 },
        { rank: 5, username: "alpha_choi", manaEarned: 8900 },
        { rank: 6, username: "beta_jung", manaEarned: 6100 },
      ],
    },
  ],
  gold: [
    {
      id: "gold-1",
      name: "황금 사자",
      tier: "gold",
      promotionLine: 2,
      members: [
        { rank: 1, username: "soyeon_park", manaEarned: 15300 },
        { rank: 2, username: "gold_trader", manaEarned: 12800 },
        { rank: 3, username: "rising_star", manaEarned: 8700 },
        { rank: 4, username: "smart_bet", manaEarned: 5400 },
        { rank: 5, username: "lucky_seven", manaEarned: 3200 },
        { rank: 6, username: "steady_win", manaEarned: 1800 },
        { rank: 7, username: "careful_play", manaEarned: 900 },
      ],
    },
  ],
  silver: [
    {
      id: "silver-1",
      name: "영리한 독수리",
      tier: "silver",
      promotionLine: 2,
      members: [
        { rank: 1, username: "sharp_eye", manaEarned: 11372 },
        { rank: 2, username: "trend_follow", manaEarned: 8301 },
        { rank: 3, username: "kb_ham", manaEarned: 4650 },
        { rank: 4, username: "new_trader", manaEarned: 2580 },
        { rank: 5, username: "learn_bet", manaEarned: 1420 },
        { rank: 6, username: "try_hard", manaEarned: 820 },
        { rank: 7, username: "first_step", manaEarned: 310 },
        { rank: 8, username: "beginner_1", manaEarned: 150 },
      ],
    },
  ],
  bronze: [
    {
      id: "bronze-1",
      name: "용감한 올빼미",
      tier: "bronze",
      promotionLine: 2,
      members: [
        { rank: 1, username: "yuna_choi", manaEarned: 3200 },
        { rank: 2, username: "newbie_park", manaEarned: 1100 },
        { rank: 3, username: "curious_cat", manaEarned: 650 },
        { rank: 4, username: "slow_steady", manaEarned: 280 },
        { rank: 5, username: "fresh_start", manaEarned: 120 },
        { rank: 6, username: "hello_world", manaEarned: -41 },
      ],
    },
  ],
};

export function getCurrentUserLeague() {
  return {
    tier: CURRENT_USER_TIER,
    groupName: CURRENT_USER_GROUP,
    rank: 3,
    manaEarned: 4650,
  };
}

export function getLeagueGroups(tier: LeagueTier): LeagueGroup[] {
  return leagueGroups[tier];
}

export function getPromotionRequirement(tier: LeagueTier): number {
  const requirements: Record<LeagueTier, number> = {
    bronze: 100,
    silver: 500,
    gold: 2000,
    platinum: 8000,
    diamond: 20000,
    master: 0,
  };
  return requirements[tier];
}

export function getPromotionTargetTier(tier: LeagueTier): LeagueTier | null {
  const index = LEAGUE_TIERS.indexOf(tier);
  return index > 0 ? LEAGUE_TIERS[index - 1] : null;
}

export function getMemberDisplayName(username: string): string {
  const user = getUserByUsername(username);
  return user?.displayName ?? username;
}

