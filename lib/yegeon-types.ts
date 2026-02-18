export type NotificationType = "trade" | "comment" | "reply" | "follow"

export interface YeGeonNotification {
  id: string
  type: NotificationType
  fromUsername: string
  marketId?: string
  marketTitle?: string
  message: string
  timestamp: string
  isRead: boolean
}

export type LeagueTier =
  | "마스터"
  | "다이아몬드"
  | "플래티넘"
  | "골드"
  | "실버"
  | "브론즈"

export interface LeagueMember {
  rank: number
  username: string
  manaEarned: number
}

export interface LeagueGroup {
  id: string
  name: string
  tier: LeagueTier
  members: LeagueMember[]
  promotionLine: number
}

export interface LeagueSeason {
  number: number
  month: string
  endDate: string
}

export type MarketType = "binary" | "multiple_choice"
export type MarketStatus = "open" | "closed" | "resolved"
export type Category = "전체" | "팔로우" | "정치" | "기술" | "스포츠" | "문화" | "비즈니스" | "재미"
export type SortOption = "popular" | "trending" | "newest"
export type TradeDirection = "YES" | "NO"

export interface YeGeonUser {
  id: string
  username: string
  displayName: string
  avatarUrl: string
  bio: string
  createdAt: string
  followersCount: number
  followingCount: number
  totalTrades: number
  profitLoss: number
  balance: number
  investedAmount: number
  netWorth: number
}

export interface MarketOption {
  id: string
  label: string
  probability: number
  color: string
}

export interface ProbabilityPoint {
  date: string
  probability: number
}

export interface YeGeonMarket {
  id: string
  slug: string
  title: string
  description: string
  type: MarketType
  status: MarketStatus
  category: Category
  creatorUsername: string
  createdAt: string
  closeDate: string
  probability: number
  volume: number
  totalTraders: number
  tags: string[]
  options?: MarketOption[]
  probabilityHistory: ProbabilityPoint[]
  coverImageUrl?: string
  isResolved: boolean
  resolution?: string
}

export interface Trade {
  id: string
  marketId: string
  marketTitle: string
  marketSlug: string
  username: string
  direction: TradeDirection
  amount: number
  probability: number
  timestamp: string
  optionLabel?: string
}

export interface Comment {
  id: string
  marketId: string
  username: string
  displayName: string
  avatarUrl: string
  content: string
  timestamp: string
  likes: number
  replies: Comment[]
}
