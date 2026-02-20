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
  | "master"
  | "diamond"
  | "platinum"
  | "gold"
  | "silver"
  | "bronze"

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
export type Category = "all" | "following" | "politics" | "technology" | "sports" | "culture" | "business" | "fun"
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

// ===== Bingo Types =====

export type BingoCellStatus = "active" | "resolved_yes" | "resolved_no" | "free_space"
export type BingoCardStatus = "active" | "won" | "lost"

export interface BingoCellData {
  slug: string
  question: string
  prob: number
  resolved: boolean | null
  url: string
  status: BingoCellStatus
}

export interface BingoLineData {
  indices: number[]
  probability: number
  isComplete: boolean
  isBlocked: boolean
}

export interface BingoCardData {
  cardId: string
  username: string
  displayName: string
  status: BingoCardStatus
  winProbability: number
  targetWinProb: number
  purchasePrice: number
  createdTime: number
  grid: BingoCellData[]
}
