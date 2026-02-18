import type { BingoCardData, BingoCellData } from "./yegeon-types"

function makeBingoCell(
  slug: string,
  question: string,
  prob: number,
  resolved: boolean | null = null,
): BingoCellData {
  const status = resolved === true
    ? "resolved_yes" as const
    : resolved === false
      ? "resolved_no" as const
      : "active" as const
  return { slug, question, prob, resolved, url: `/yegeon/question/${slug}`, status }
}

function makeFreeSpace(): BingoCellData {
  return {
    slug: "free-space",
    question: "FREE SPACE",
    prob: 1.0,
    resolved: true,
    url: "",
    status: "free_space",
  }
}

export const bingoCards: BingoCardData[] = [
  {
    cardId: "bingo-001",
    username: "kb_ham",
    displayName: "함경범",
    status: "active",
    winProbability: 0.47,
    targetWinProb: 0.45,
    purchasePrice: 12500,
    createdTime: Date.now() - 30 * 86400000,
    grid: [
      makeBingoCell("president-approval-40-percent-2026", "대통령 지지율 40% 돌파?", 0.28),
      makeBingoCell("samsung-stock-100k-2026", "삼성전자 10만원 돌파?", 0.42),
      makeBingoCell("korea-birth-rate-rebound-2026", "출산율 반등?", 0.12),
      makeBingoCell("gdp-growth-3-percent-2026", "GDP 성장률 3% 이상?", 0.35),
      makeBingoCell("inter-korean-summit-2026", "남북 정상회담 개최?", 0.08),
      makeBingoCell("bts-full-comeback-2026", "BTS 완전체 컴백?", 0.72),
      makeBingoCell("kpop-billboard-hot100-2026", "K-POP 빌보드 HOT 100 1위?", 0.58),
      makeBingoCell("korea-ai-regulation-2026", "AI 규제법 국회 통과?", 0.38),
      makeBingoCell("digital-won-pilot-2026", "디지털 원화 시범 운영?", 0.22),
      makeBingoCell("korean-drama-netflix-global-first-2026", "한드 넷플릭스 글로벌 1위?", 0.55, true),
      makeBingoCell("korea-worldcup-qualifier-first-2026", "월드컵 예선 1위 통과?", 0.65),
      makeBingoCell("esports-olympics-medal-2026", "e스포츠 아시안게임 금메달?", 0.82),
      makeFreeSpace(),
      makeBingoCell("kakaobank-market-cap-30t-2026", "카카오뱅크 시총 30조?", 0.18),
      makeBingoCell("population-below-52m-2026", "인구 5200만 이하 감소?", 0.45),
      makeBingoCell("semiconductor-export-100b-2026", "반도체 수출 1000억달러?", 0.52),
      makeBingoCell("kospi-3000-2026", "코스피 3000 돌파?", 0.30, false),
      makeBingoCell("housing-price-15-2026", "서울 아파트 15억 돌파?", 0.33),
      makeBingoCell("unemployment-below-3-2026", "실업률 3% 이하 유지?", 0.61),
      makeBingoCell("ev-market-share-15-2026", "전기차 점유율 15% 돌파?", 0.48),
      makeBingoCell("korean-oscar-2026", "한국 영화 아카데미 수상?", 0.28),
      makeBingoCell("naver-ai-search-50-2026", "네이버 AI 검색 50%?", 0.31),
      makeBingoCell("pension-reform-2026", "연금 개혁안 통과?", 0.28),
      makeBingoCell("k-food-export-10b-2026", "K-푸드 수출 100억달러?", 0.40),
      makeBingoCell("space-launch-nuri-2026", "누리호 상업 발사 성공?", 0.68),
    ],
  },
  {
    cardId: "bingo-002",
    username: "soyeon_park",
    displayName: "박소연",
    status: "active",
    winProbability: 0.35,
    targetWinProb: 0.40,
    purchasePrice: 9800,
    createdTime: Date.now() - 25 * 86400000,
    grid: [
      makeBingoCell("bts-full-comeback-2026", "BTS 완전체 컴백?", 0.72),
      makeBingoCell("blackpink-world-tour-2026", "블랙핑크 월드투어?", 0.65),
      makeBingoCell("korean-oscar-2026", "한국 영화 아카데미 수상?", 0.28),
      makeBingoCell("korean-person-of-year-2026", "올해의 한국인?", 0.44),
      makeBingoCell("kpop-billboard-hot100-2026", "K-POP 빌보드 HOT 100 1위?", 0.58),
      makeBingoCell("samsung-stock-100k-2026", "삼성전자 10만원 돌파?", 0.42),
      makeBingoCell("kospi-3000-2026", "코스피 3000 돌파?", 0.30, false),
      makeBingoCell("startup-unicorn-3-2026", "유니콘 기업 3개 이상?", 0.35),
      makeBingoCell("crypto-tax-2026", "가상자산 과세 시행?", 0.62),
      makeBingoCell("housing-price-15-2026", "서울 아파트 15억 돌파?", 0.33),
      makeBingoCell("korea-worldcup-qualifier-first-2026", "월드컵 예선 1위 통과?", 0.65),
      makeBingoCell("wbc-semifinal-korea-2026", "WBC 4강 진출?", 0.55),
      makeFreeSpace(),
      makeBingoCell("son-heungmin-20-goals-2026", "손흥민 20골 달성?", 0.45),
      makeBingoCell("esports-olympics-medal-2026", "e스포츠 아시안게임 금메달?", 0.82),
      makeBingoCell("president-approval-40-percent-2026", "대통령 지지율 40% 돌파?", 0.28),
      makeBingoCell("korea-ai-regulation-2026", "AI 규제법 국회 통과?", 0.38),
      makeBingoCell("climate-carbon-neutral-2026", "탄소중립 이행법 강화?", 0.33),
      makeBingoCell("pension-reform-2026", "연금 개혁안 통과?", 0.28),
      makeBingoCell("korea-birth-rate-rebound-2026", "출산율 반등?", 0.12),
      makeBingoCell("population-below-52m-2026", "인구 5200만 이하?", 0.45, true),
      makeBingoCell("digital-won-pilot-2026", "디지털 원화 시범 운영?", 0.22),
      makeBingoCell("naver-ai-search-50-2026", "네이버 AI 검색 50%?", 0.31),
      makeBingoCell("space-launch-nuri-2026", "누리호 상업 발사 성공?", 0.68),
      makeBingoCell("semiconductor-export-100b-2026", "반도체 수출 1000억달러?", 0.52),
    ],
  },
  {
    cardId: "bingo-003",
    username: "minho_lee",
    displayName: "이민호",
    status: "won",
    winProbability: 0.92,
    targetWinProb: 0.50,
    purchasePrice: 15000,
    createdTime: Date.now() - 60 * 86400000,
    grid: [
      makeBingoCell("semiconductor-export-100b-2026", "반도체 수출 1000억달러?", 0.52, true),
      makeBingoCell("hbm-market-share-50-2026", "HBM 시장 점유율 50%?", 0.68, true),
      makeBingoCell("korean-drama-netflix-global-first-2026", "한드 넷플릭스 글로벌 1위?", 0.55),
      makeBingoCell("naver-ai-search-50-2026", "네이버 AI 검색 50%?", 0.31),
      makeBingoCell("korea-ai-regulation-2026", "AI 규제법 국회 통과?", 0.38),
      makeBingoCell("samsung-stock-100k-2026", "삼성전자 10만원 돌파?", 0.42, true),
      makeBingoCell("sk-hynix-record-profit-2026", "SK하이닉스 최대 실적?", 0.72, true),
      makeBingoCell("kospi-3000-2026", "코스피 3000 돌파?", 0.30),
      makeBingoCell("startup-unicorn-3-2026", "유니콘 기업 3개 이상?", 0.35),
      makeBingoCell("digital-won-pilot-2026", "디지털 원화 시범 운영?", 0.22),
      makeBingoCell("space-launch-nuri-2026", "누리호 상업 발사 성공?", 0.68),
      makeBingoCell("ev-market-share-15-2026", "전기차 점유율 15% 돌파?", 0.48),
      makeFreeSpace(),
      makeBingoCell("kpop-billboard-hot100-2026", "K-POP 빌보드 HOT 100 1위?", 0.58),
      makeBingoCell("ship-order-first-2026", "조선 수주 세계 1위?", 0.72, true),
      makeBingoCell("gdp-growth-3-percent-2026", "GDP 성장률 3% 이상?", 0.35),
      makeBingoCell("unemployment-below-3-2026", "실업률 3% 이하?", 0.61, true),
      makeBingoCell("pension-reform-2026", "연금 개혁안 통과?", 0.28),
      makeBingoCell("climate-carbon-neutral-2026", "탄소중립 이행법 강화?", 0.33),
      makeBingoCell("korea-worldcup-qualifier-first-2026", "월드컵 예선 1위 통과?", 0.65),
      makeBingoCell("esports-olympics-medal-2026", "e스포츠 아시안게임 금메달?", 0.82),
      makeBingoCell("korean-oscar-2026", "한국 영화 아카데미 수상?", 0.28),
      makeBingoCell("k-food-export-10b-2026", "K-푸드 수출 100억달러?", 0.40),
      makeBingoCell("population-below-52m-2026", "인구 5200만 이하?", 0.45),
      makeBingoCell("blackpink-world-tour-2026", "블랙핑크 월드투어?", 0.65),
    ],
  },
  {
    cardId: "bingo-004",
    username: "yuna_choi",
    displayName: "최유나",
    status: "lost",
    winProbability: 0.03,
    targetWinProb: 0.35,
    purchasePrice: 8200,
    createdTime: Date.now() - 45 * 86400000,
    grid: [
      makeBingoCell("korea-worldcup-qualifier-first-2026", "월드컵 예선 1위 통과?", 0.65, true),
      makeBingoCell("son-heungmin-20-goals-2026", "손흥민 20골 달성?", 0.45, false),
      makeBingoCell("wbc-semifinal-korea-2026", "WBC 4강 진출?", 0.55, false),
      makeBingoCell("korean-person-of-year-2026", "올해의 한국인?", 0.44, false),
      makeBingoCell("esports-olympics-medal-2026", "e스포츠 아시안게임 금메달?", 0.82),
      makeBingoCell("blackpink-world-tour-2026", "블랙핑크 월드투어?", 0.65, false),
      makeBingoCell("korean-oscar-2026", "한국 영화 아카데미 수상?", 0.28),
      makeBingoCell("bts-full-comeback-2026", "BTS 완전체 컴백?", 0.72),
      makeBingoCell("kpop-billboard-hot100-2026", "K-POP 빌보드 HOT 100 1위?", 0.58),
      makeBingoCell("inter-korean-summit-2026", "남북 정상회담 개최?", 0.08, false),
      makeBingoCell("president-approval-40-percent-2026", "대통령 지지율 40% 돌파?", 0.28),
      makeBingoCell("korea-birth-rate-rebound-2026", "출산율 반등?", 0.12, false),
      makeFreeSpace(),
      makeBingoCell("housing-price-15-2026", "서울 아파트 15억 돌파?", 0.33, false),
      makeBingoCell("kakaobank-market-cap-30t-2026", "카카오뱅크 시총 30조?", 0.18, false),
      makeBingoCell("samsung-stock-100k-2026", "삼성전자 10만원 돌파?", 0.42),
      makeBingoCell("crypto-tax-2026", "가상자산 과세 시행?", 0.62, false),
      makeBingoCell("semiconductor-export-100b-2026", "반도체 수출 1000억달러?", 0.52),
      makeBingoCell("naver-ai-search-50-2026", "네이버 AI 검색 50%?", 0.31),
      makeBingoCell("sk-hynix-record-profit-2026", "SK하이닉스 최대 실적?", 0.72),
      makeBingoCell("hbm-market-share-50-2026", "HBM 시장 점유율 50%?", 0.68),
      makeBingoCell("space-launch-nuri-2026", "누리호 상업 발사 성공?", 0.68, false),
      makeBingoCell("gdp-growth-3-percent-2026", "GDP 성장률 3% 이상?", 0.35),
      makeBingoCell("pension-reform-2026", "연금 개혁안 통과?", 0.28, false),
      makeBingoCell("climate-carbon-neutral-2026", "탄소중립 이행법 강화?", 0.33),
    ],
  },
  {
    cardId: "bingo-005",
    username: "hyunwoo_jung",
    displayName: "정현우",
    status: "active",
    winProbability: 0.58,
    targetWinProb: 0.55,
    purchasePrice: 18000,
    createdTime: Date.now() - 20 * 86400000,
    grid: [
      makeBingoCell("kospi-3000-2026", "코스피 3000 돌파?", 0.30),
      makeBingoCell("samsung-stock-100k-2026", "삼성전자 10만원 돌파?", 0.42),
      makeBingoCell("gdp-growth-3-percent-2026", "GDP 성장률 3% 이상?", 0.35, true),
      makeBingoCell("semiconductor-export-100b-2026", "반도체 수출 1000억달러?", 0.52),
      makeBingoCell("top-korean-stock-2026", "가장 오를 한국 주식?", 0.44),
      makeBingoCell("ship-order-first-2026", "조선 수주 세계 1위?", 0.72, true),
      makeBingoCell("unemployment-below-3-2026", "실업률 3% 이하?", 0.61, true),
      makeBingoCell("ev-market-share-15-2026", "전기차 점유율 15%?", 0.48),
      makeBingoCell("startup-unicorn-3-2026", "유니콘 기업 3개 이상?", 0.35),
      makeBingoCell("crypto-tax-2026", "가상자산 과세 시행?", 0.62),
      makeBingoCell("hbm-market-share-50-2026", "HBM 시장 점유율 50%?", 0.68),
      makeBingoCell("sk-hynix-record-profit-2026", "SK하이닉스 최대 실적?", 0.72),
      makeFreeSpace(),
      makeBingoCell("housing-price-15-2026", "서울 아파트 15억 돌파?", 0.33),
      makeBingoCell("pension-reform-2026", "연금 개혁안 통과?", 0.28),
      makeBingoCell("kakaobank-market-cap-30t-2026", "카카오뱅크 시총 30조?", 0.18),
      makeBingoCell("korea-ai-regulation-2026", "AI 규제법 국회 통과?", 0.38),
      makeBingoCell("digital-won-pilot-2026", "디지털 원화 시범 운영?", 0.22),
      makeBingoCell("naver-ai-search-50-2026", "네이버 AI 검색 50%?", 0.31),
      makeBingoCell("k-food-export-10b-2026", "K-푸드 수출 100억달러?", 0.40),
      makeBingoCell("population-below-52m-2026", "인구 5200만 이하?", 0.45),
      makeBingoCell("climate-carbon-neutral-2026", "탄소중립 이행법 강화?", 0.33),
      makeBingoCell("korea-birth-rate-rebound-2026", "출산율 반등?", 0.12),
      makeBingoCell("space-launch-nuri-2026", "누리호 상업 발사 성공?", 0.68),
      makeBingoCell("blackpink-world-tour-2026", "블랙핑크 월드투어?", 0.65),
    ],
  },
]

export function getBingoCards(): BingoCardData[] {
  return bingoCards
}

export function getBingoCardById(cardId: string): BingoCardData | undefined {
  return bingoCards.find((c) => c.cardId === cardId)
}

export function getBingoStats(): {
  totalCards: number
  activeCards: number
  winners: number
} {
  return {
    totalCards: bingoCards.length,
    activeCards: bingoCards.filter((c) => c.status === "active").length,
    winners: bingoCards.filter((c) => c.status === "won").length,
  }
}
