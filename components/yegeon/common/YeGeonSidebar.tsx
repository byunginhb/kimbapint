"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  Compass,
  Bell,
  Trophy,
  MessageSquare,
  ShoppingBag,
  Info,
  Star,
  Moon,
  Sun,
  LogOut,
} from "lucide-react"
import { useTheme } from "./ThemeContext"
import { getCurrentUser, getUnreadNotificationCount } from "@/lib/yegeon-data"
import UserAvatar from "./UserAvatar"

interface YeGeonSidebarProps {
  onNavigate?: () => void
}

interface NavItem {
  label: string
  icon: ReactNode
  href: string
  badge?: string
}

const mainNav: NavItem[] = [
  { label: "둘러보기", icon: <Search className="h-5 w-5" />, href: "/yegeon" },
  { label: "탐색", icon: <Compass className="h-5 w-5" />, href: "/yegeon/explore" },
  { label: "알림", icon: <Bell className="h-5 w-5" />, href: "/yegeon/notifications" },
  { label: "리그", icon: <Trophy className="h-5 w-5" />, href: "/yegeon/leagues" },
  { label: "포럼", icon: <MessageSquare className="h-5 w-5" />, href: "/yegeon/forum" },
  {
    label: "상점",
    icon: <ShoppingBag className="h-5 w-5" />,
    href: "/yegeon/shop",
    badge: "NEW",
  },
]

export default function YeGeonSidebar({ onNavigate }: YeGeonSidebarProps) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const user = getCurrentUser()
  const unreadCount = getUnreadNotificationCount()

  return (
    <aside className="flex h-full flex-col overflow-y-auto px-5 py-5">
      {/* Logo */}
      <Link
        href="/yegeon"
        onClick={onNavigate}
        className="mb-4 px-1"
      >
        <span className="yegeon-logo text-xl font-extrabold tracking-widest">
          YEGEON
        </span>
      </Link>

      {/* User profile */}
      <Link
        href={`/yegeon/${user.username}`}
        onClick={onNavigate}
        className="mb-5 flex items-center gap-3 rounded-lg px-1 py-1 transition-colors hover:yg-bg-canvas-50"
      >
        <UserAvatar
          size={40}
          displayName={user.displayName}
          colorSeed={user.username}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold yg-text-ink-900">
            {user.displayName}
          </p>
          <p className="text-xs yg-text-ink-400">
            Ⓜ{user.balance.toLocaleString("ko-KR")}
          </p>
        </div>
      </Link>

      {/* Main navigation */}
      <nav className="flex flex-col gap-0.5">
        {mainNav.map((item) => {
          const isActive =
            item.href === "/yegeon"
              ? pathname === "/yegeon"
              : pathname.startsWith(item.href)
          const showUnread = item.label === "알림" && unreadCount > 0
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "yg-bg-primary-100/20 yg-text-primary-500"
                  : "yg-text-ink-600 hover:yg-bg-canvas-50 hover:yg-text-ink-1000"
              }`}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {showUnread && (
                <span className="rounded-full yg-bg-primary-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
              {item.badge && (
                <span className="rounded-full yg-bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Action buttons */}
      <div className="mt-5 flex flex-col gap-2.5">
        <button
          type="button"
          className="rounded-lg border yg-border-canvas-100 px-4 py-2.5 text-sm font-medium yg-text-ink-700 transition-colors hover:yg-bg-canvas-50"
        >
          마켓 만들기
        </button>
        <button
          type="button"
          className="rounded-lg yg-bg-primary-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:yg-bg-primary-600"
        >
          Ⓜ 마나 받기
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom links */}
      <nav className="flex flex-col gap-0.5">
        <span
          role="none"
          aria-hidden="true"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm yg-text-ink-400 cursor-default"
        >
          <Info className="h-5 w-5" />
          소개
        </span>
        <span
          role="none"
          aria-hidden="true"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm yg-text-ink-400 cursor-default"
        >
          <Star className="h-5 w-5" />
          추천
        </span>
        <button
          type="button"
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm yg-text-ink-600 transition-colors hover:yg-bg-canvas-50 hover:yg-text-ink-1000"
        >
          {theme === "light" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          {theme === "light" ? "라이트" : "다크"}
        </button>
        <span
          role="none"
          aria-hidden="true"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm yg-text-ink-400 cursor-default"
        >
          <LogOut className="h-5 w-5" />
          로그아웃
        </span>
      </nav>
    </aside>
  )
}
