import type {
  YeGeonUser,
  YeGeonMarket,
  Trade,
  Comment,
  Category,
  ProbabilityPoint,
} from "./yegeon-types"

function generateProbabilityHistory(
  current: number,
  days: number = 30
): ProbabilityPoint[] {
  const points: ProbabilityPoint[] = []
  const now = new Date()
  let prob = Math.max(0.05, Math.min(0.95, current + (Math.random() - 0.5) * 0.3))

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    points.push({
      date: date.toISOString().split("T")[0],
      probability: Math.round(prob * 100) / 100,
    })
    const drift = (current - prob) * 0.1
    const noise = (Math.random() - 0.5) * 0.08
    prob = Math.max(0.02, Math.min(0.98, prob + drift + noise))
  }

  const last = points[points.length - 1]
  if (last) {
    last.probability = current
  }

  return points
}

export const users: YeGeonUser[] = [
  {
    id: "u1",
    username: "jinwoo_kim",
    displayName: "김진우",
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
]

export const markets: YeGeonMarket[] = [
  {
    id: "m1",
    slug: "president-approval-40-percent-2026",
    title: "2026년 대한민국 대통령 지지율이 40%를 넘길까?",
    description:
      "현재 대통령의 갤럽코리아 기준 지지율이 2026년 12월 31일까지 40%를 넘기는 주간 조사 결과가 1회 이상 발표되면 YES로 결의합니다.",
    type: "binary",
    status: "open",
    category: "정치",
    creatorUsername: "jinwoo_kim",
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
    category: "비즈니스",
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
    category: "스포츠",
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
    category: "문화",
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
    category: "정치",
    creatorUsername: "jinwoo_kim",
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
    category: "비즈니스",
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
    category: "정치",
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
    category: "문화",
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
    category: "문화",
    creatorUsername: "jinwoo_kim",
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
      { id: "opt4", label: "이미경", probability: 0.10, color: "#ef4444" },
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
    category: "비즈니스",
    creatorUsername: "hyunwoo_jung",
    createdAt: "2025-12-28",
    closeDate: "2026-12-30",
    probability: 0.30,
    volume: 15670000,
    totalTraders: 4892,
    tags: ["주식", "투자", "코스피"],
    options: [
      { id: "opt1", label: "삼성전자", probability: 0.30, color: "#3b82f6" },
      { id: "opt2", label: "SK하이닉스", probability: 0.28, color: "#14b8a6" },
      { id: "opt3", label: "네이버", probability: 0.18, color: "#22c55e" },
      { id: "opt4", label: "카카오", probability: 0.12, color: "#f59e0b" },
      { id: "opt5", label: "기타", probability: 0.12, color: "#64748b" },
    ],
    probabilityHistory: generateProbabilityHistory(0.30),
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
    category: "기술",
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
    category: "스포츠",
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
]

export const trades: Trade[] = [
  {
    id: "t1",
    marketId: "m8",
    marketTitle: "BTS 완전체 컴백이 2026년에 이루어질까?",
    marketSlug: "bts-full-comeback-2026",
    username: "jinwoo_kim",
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
    username: "jinwoo_kim",
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
    username: "jinwoo_kim",
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
    username: "jinwoo_kim",
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
    username: "jinwoo_kim",
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
    username: "jinwoo_kim",
    direction: "NO",
    amount: 10000,
    probability: 0.10,
    timestamp: "2026-02-02T13:30:00Z",
  },
  {
    id: "t7",
    marketId: "m9",
    marketTitle: "2026년 올해의 한국인은 누가 될까?",
    marketSlug: "korean-person-of-year-2026",
    username: "jinwoo_kim",
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
    username: "jinwoo_kim",
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
]

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
        username: "jinwoo_kim",
        displayName: "김진우",
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
]

export function getCurrentUser(): YeGeonUser {
  return users[0]
}

export function getUserByUsername(username: string): YeGeonUser | undefined {
  return users.find((u) => u.username === username)
}

export function getMarketBySlug(slug: string): YeGeonMarket | undefined {
  return markets.find((m) => m.slug === slug)
}

export function getMarketsByCategory(category: Category): YeGeonMarket[] {
  if (category === "전체") return markets
  return markets.filter((m) => m.category === category)
}

export function getTradesByUsername(username: string): Trade[] {
  return trades.filter((t) => t.username === username)
}

export function getCommentsByMarketId(marketId: string): Comment[] {
  return comments.filter((c) => c.marketId === marketId)
}

export function getRelatedMarkets(
  currentSlug: string,
  limit: number = 3
): YeGeonMarket[] {
  const current = getMarketBySlug(currentSlug)
  if (!current) return markets.slice(0, limit)

  return markets
    .filter((m) => m.slug !== currentSlug)
    .filter(
      (m) =>
        m.category === current.category ||
        m.tags.some((t) => current.tags.includes(t))
    )
    .slice(0, limit)
}

export function formatVolume(volume: number): string {
  if (volume >= 100000000) {
    return `${(volume / 100000000).toFixed(1)}억`
  }
  if (volume >= 10000) {
    return `${Math.floor(volume / 10000)}만`
  }
  return volume.toLocaleString("ko-KR")
}

export function formatYeGeonCurrency(amount: number): string {
  return `₩${amount.toLocaleString("ko-KR")}`
}
