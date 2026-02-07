"use client"

import Link from "next/link"
import { Search, Bell, Menu, X, Sun, Moon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "./ThemeContext"

export default function YeGeonNav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 border-b yg-border-canvas-100 yg-bg-canvas-0 backdrop-blur-sm" style={{ backgroundColor: `rgb(var(--color-canvas-0) / 0.95)` }}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/yegeon" className="flex items-center gap-2">
            <span className="yegeon-logo text-xl font-extrabold tracking-widest">YEGEON</span>
          </Link>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/yegeon"
              className="text-sm yg-text-ink-600 transition-colors hover:yg-text-ink-1000"
            >
              탐색
            </Link>
            <span className="text-sm yg-text-ink-400 cursor-default">
              소개
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-lg yg-bg-canvas-50 px-3 py-1.5">
            <Search className="h-4 w-4 yg-text-ink-400" />
            <span className="text-sm yg-text-ink-400">마켓 검색...</span>
          </div>
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 yg-text-ink-400 transition-colors hover:yg-bg-canvas-50 hover:yg-text-ink-1000"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
          <button className="rounded-lg p-2 yg-text-ink-400 transition-colors hover:yg-bg-canvas-50 hover:yg-text-ink-1000">
            <Bell className="h-5 w-5" />
          </button>
          <button className="rounded-lg yg-bg-primary-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:yg-bg-primary-600">
            로그인
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 yg-text-ink-400"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 yg-text-ink-400"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t yg-border-canvas-100 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/yegeon"
              className="text-sm yg-text-ink-600"
              onClick={() => setMobileOpen(false)}
            >
              탐색
            </Link>
            <span className="text-sm yg-text-ink-400">소개</span>
            <div className="flex items-center gap-2 rounded-lg yg-bg-canvas-50 px-3 py-2">
              <Search className="h-4 w-4 yg-text-ink-400" />
              <span className="text-sm yg-text-ink-400">마켓 검색...</span>
            </div>
            <button className="rounded-lg yg-bg-primary-500 px-4 py-2 text-sm font-medium text-white">
              로그인
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
