// PolyPulse 위협 레벨 타입
export type PolyPulseThreatLevel = "LOW" | "MODERATE" | "ELEVATED" | "HIGH" | "CRITICAL";

// 위협 레벨 설정 (label/description은 번역 파일에서 관리)
export const THREAT_LEVEL_CONFIG: Record<PolyPulseThreatLevel, {
  color: string;
  bgColor: string;
  borderColor: string;
  chartColor: string;
}> = {
  LOW: {
    color: "text-green-400",
    bgColor: "bg-green-900/30",
    borderColor: "border-green-500/30",
    chartColor: "#22c55e",
  },
  MODERATE: {
    color: "text-cyan-400",
    bgColor: "bg-cyan-900/30",
    borderColor: "border-cyan-500/30",
    chartColor: "#06b6d4",
  },
  ELEVATED: {
    color: "text-yellow-400",
    bgColor: "bg-yellow-900/30",
    borderColor: "border-yellow-500/30",
    chartColor: "#eab308",
  },
  HIGH: {
    color: "text-orange-400",
    bgColor: "bg-orange-900/30",
    borderColor: "border-orange-500/30",
    chartColor: "#f97316",
  },
  CRITICAL: {
    color: "text-red-400",
    bgColor: "bg-red-900/30",
    borderColor: "border-red-500/30",
    chartColor: "#ef4444",
  },
};

// 국가 정보
export interface Country {
  code: string;
  name: string;
  flag: string;
}

// 위협 쌍 기본 정보
export interface ThreatPair {
  id: string;
  from: Country;
  to: Country;
  level: PolyPulseThreatLevel;
  zScore: number;
  lastUpdated: string;
}

// Z-점수 히스토리
export interface ZScoreHistory {
  date: string;
  zScore: number;
}

// 핵심 이벤트
export interface KeyEvent {
  date: string;
  title: string;
  impact: "positive" | "negative" | "neutral";
  zScoreImpact: number;
}

// 관련 뉴스
export interface RelatedNews {
  title: string;
  source: string;
  date: string;
}

// 통계
export interface Statistics {
  avg28d: number;
  avg90d: number;
  percentile: number;
  trend: "rising" | "falling" | "stable";
}

// 위협 쌍 상세 정보
export interface ThreatPairDetail extends ThreatPair {
  zScoreHistory: ZScoreHistory[];
  keyEvents: KeyEvent[];
  relatedNews: RelatedNews[];
  statistics: Statistics;
}

// 시드 기반 난수 생성 (hydration 문제 방지)
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Z-점수 히스토리 생성
function generateZScoreHistory(seed: number, baseZ: number, days: number = 90): ZScoreHistory[] {
  const history: ZScoreHistory[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const variance = (seededRandom(seed + i) - 0.5) * 2;
    const zScore = Math.max(-2, Math.min(6, baseZ + variance));
    history.push({
      date: date.toISOString().slice(0, 10),
      zScore: Number(zScore.toFixed(2)),
    });
  }

  return history;
}

// 목업 데이터: 6개 국가 쌍
export const mockThreatPairs: ThreatPair[] = [
  {
    id: "us-ru",
    from: { code: "US", name: "미국", flag: "🇺🇸" },
    to: { code: "RU", name: "러시아", flag: "🇷🇺" },
    level: "MODERATE",
    zScore: 1.2,
    lastUpdated: "2026-01-30T09:00:00Z",
  },
  {
    id: "ru-ua",
    from: { code: "RU", name: "러시아", flag: "🇷🇺" },
    to: { code: "UA", name: "우크라이나", flag: "🇺🇦" },
    level: "HIGH",
    zScore: 3.8,
    lastUpdated: "2026-01-30T09:00:00Z",
  },
  {
    id: "us-cn",
    from: { code: "US", name: "미국", flag: "🇺🇸" },
    to: { code: "CN", name: "중국", flag: "🇨🇳" },
    level: "MODERATE",
    zScore: 1.5,
    lastUpdated: "2026-01-30T09:00:00Z",
  },
  {
    id: "cn-tw",
    from: { code: "CN", name: "중국", flag: "🇨🇳" },
    to: { code: "TW", name: "대만", flag: "🇹🇼" },
    level: "HIGH",
    zScore: 3.2,
    lastUpdated: "2026-01-30T09:00:00Z",
  },
  {
    id: "us-ir",
    from: { code: "US", name: "미국", flag: "🇺🇸" },
    to: { code: "IR", name: "이란", flag: "🇮🇷" },
    level: "CRITICAL",
    zScore: 4.8,
    lastUpdated: "2026-01-30T09:00:00Z",
  },
  {
    id: "us-ve",
    from: { code: "US", name: "미국", flag: "🇺🇸" },
    to: { code: "VE", name: "베네수엘라", flag: "🇻🇪" },
    level: "CRITICAL",
    zScore: 4.5,
    lastUpdated: "2026-01-30T09:00:00Z",
  },
];

// 목업 상세 데이터
export const mockThreatPairDetails: Record<string, ThreatPairDetail> = {
  "us-ru": {
    ...mockThreatPairs[0],
    zScoreHistory: generateZScoreHistory(101, 1.2),
    keyEvents: [
      { date: "2026-01-28", title: "미-러 외교 회담 개최 발표", impact: "positive", zScoreImpact: -0.3 },
      { date: "2026-01-25", title: "러시아, 북극해 군사훈련 실시", impact: "negative", zScoreImpact: 0.5 },
      { date: "2026-01-20", title: "미국 제재 일부 완화 검토", impact: "positive", zScoreImpact: -0.4 },
    ],
    relatedNews: [
      { title: "미-러 관계 개선 조짐, 전문가들 신중한 낙관", source: "연합뉴스", date: "2026-01-29" },
      { title: "푸틴, 바이든과 전화회담 희망 표명", source: "조선일보", date: "2026-01-28" },
      { title: "러시아 외무부, 대화 재개 의사 밝혀", source: "한겨레", date: "2026-01-27" },
    ],
    statistics: { avg28d: 1.4, avg90d: 1.8, percentile: 62, trend: "falling" },
  },
  "ru-ua": {
    ...mockThreatPairs[1],
    zScoreHistory: generateZScoreHistory(102, 3.8),
    keyEvents: [
      { date: "2026-01-29", title: "우크라이나 동부 전선 교착 상태 지속", impact: "neutral", zScoreImpact: 0.1 },
      { date: "2026-01-26", title: "러시아군 드론 공격 증가", impact: "negative", zScoreImpact: 0.8 },
      { date: "2026-01-22", title: "EU, 우크라이나 추가 군사 지원 발표", impact: "negative", zScoreImpact: 0.4 },
    ],
    relatedNews: [
      { title: "우크라이나 전쟁 3년차, 끝이 보이지 않는 소모전", source: "중앙일보", date: "2026-01-30" },
      { title: "젤렌스키, 평화협상 조건 재확인", source: "KBS", date: "2026-01-29" },
      { title: "러시아, 크림반도 방공 강화", source: "MBC", date: "2026-01-28" },
    ],
    statistics: { avg28d: 3.6, avg90d: 3.2, percentile: 89, trend: "rising" },
  },
  "us-cn": {
    ...mockThreatPairs[2],
    zScoreHistory: generateZScoreHistory(103, 1.5),
    keyEvents: [
      { date: "2026-01-27", title: "미-중 무역협상 재개", impact: "positive", zScoreImpact: -0.5 },
      { date: "2026-01-24", title: "중국, 남중국해 인공섬 확장", impact: "negative", zScoreImpact: 0.3 },
      { date: "2026-01-18", title: "미국, 반도체 수출 제한 유지 발표", impact: "negative", zScoreImpact: 0.4 },
    ],
    relatedNews: [
      { title: "미-중 경제대화, 신뢰 회복 첫걸음", source: "매일경제", date: "2026-01-28" },
      { title: "바이든 행정부, 대중 정책 재검토 착수", source: "한국경제", date: "2026-01-26" },
      { title: "중국 상무부, 무역분쟁 해결 의지 표명", source: "서울경제", date: "2026-01-25" },
    ],
    statistics: { avg28d: 1.6, avg90d: 2.1, percentile: 58, trend: "stable" },
  },
  "cn-tw": {
    ...mockThreatPairs[3],
    zScoreHistory: generateZScoreHistory(104, 3.2),
    keyEvents: [
      { date: "2026-01-28", title: "중국 군용기 대만 방공식별구역 진입", impact: "negative", zScoreImpact: 0.6 },
      { date: "2026-01-23", title: "대만 총통, 방어력 강화 선언", impact: "negative", zScoreImpact: 0.3 },
      { date: "2026-01-15", title: "미국 의회, 대만 지원법안 통과", impact: "negative", zScoreImpact: 0.5 },
    ],
    relatedNews: [
      { title: "대만해협 긴장 고조, 아시아 안보 위기감", source: "동아일보", date: "2026-01-29" },
      { title: "중국, 대만 통일 의지 재천명", source: "경향신문", date: "2026-01-27" },
      { title: "대만, 미사일 방어 시스템 증강 계획", source: "SBS", date: "2026-01-26" },
    ],
    statistics: { avg28d: 3.0, avg90d: 2.5, percentile: 85, trend: "rising" },
  },
  "us-ir": {
    ...mockThreatPairs[4],
    zScoreHistory: generateZScoreHistory(105, 4.8),
    keyEvents: [
      { date: "2026-01-29", title: "이란, 우라늄 농축 90% 도달 발표", impact: "negative", zScoreImpact: 1.2 },
      { date: "2026-01-25", title: "미국, 이란 제재 추가 발동", impact: "negative", zScoreImpact: 0.8 },
      { date: "2026-01-20", title: "호르무즈 해협 미군 함정 증강", impact: "negative", zScoreImpact: 0.5 },
    ],
    relatedNews: [
      { title: "이란 핵 위기, 최고조 달해", source: "YTN", date: "2026-01-30" },
      { title: "IAEA, 이란 핵시설 긴급 사찰 요청", source: "연합뉴스", date: "2026-01-29" },
      { title: "중동 긴장 속 유가 급등", source: "한국경제", date: "2026-01-28" },
    ],
    statistics: { avg28d: 4.5, avg90d: 3.8, percentile: 97, trend: "rising" },
  },
  "us-ve": {
    ...mockThreatPairs[5],
    zScoreHistory: generateZScoreHistory(106, 4.5),
    keyEvents: [
      { date: "2026-01-28", title: "베네수엘라, 가이아나 국경 군 배치", impact: "negative", zScoreImpact: 0.9 },
      { date: "2026-01-24", title: "미국, 카리브해 해군 훈련 실시", impact: "negative", zScoreImpact: 0.6 },
      { date: "2026-01-19", title: "마두로 정권, 야당 탄압 강화", impact: "negative", zScoreImpact: 0.4 },
    ],
    relatedNews: [
      { title: "중남미 위기, 미국 개입 가능성 거론", source: "조선일보", date: "2026-01-29" },
      { title: "베네수엘라-가이아나 영토 분쟁 격화", source: "중앙일보", date: "2026-01-28" },
      { title: "OAS, 베네수엘라 상황 우려 성명", source: "KBS", date: "2026-01-27" },
    ],
    statistics: { avg28d: 4.2, avg90d: 3.5, percentile: 95, trend: "rising" },
  },
};

// 유틸리티 함수들
export function getThreatPairById(id: string): ThreatPair | undefined {
  return mockThreatPairs.find((pair) => pair.id === id);
}

export function getThreatPairDetailById(id: string): ThreatPairDetail | undefined {
  return mockThreatPairDetails[id];
}

export function getAllThreatPairs(): ThreatPair[] {
  return mockThreatPairs;
}

// 위협 레벨별 필터
export function getThreatPairsByLevel(level: PolyPulseThreatLevel): ThreatPair[] {
  return mockThreatPairs.filter((pair) => pair.level === level);
}

// 통계 계산
export function calculateGlobalStats() {
  const pairs = mockThreatPairs;
  const totalPairs = pairs.length;
  const avgZScore = pairs.reduce((sum, p) => sum + p.zScore, 0) / totalPairs;
  const criticalPairs = pairs.filter((p) => p.level === "CRITICAL" || p.level === "HIGH").length;

  return {
    totalPairs,
    avgZScore: Number(avgZScore.toFixed(2)),
    criticalPairs,
  };
}
