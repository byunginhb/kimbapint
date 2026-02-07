"use client"

import { cn } from "@/lib/utils"

export type ProfileTab = "trades" | "markets" | "comments"

const tabs: { value: ProfileTab; label: string }[] = [
  { value: "trades", label: "거래 내역" },
  { value: "markets", label: "생성한 마켓" },
  { value: "comments", label: "댓글" },
]

interface ProfileTabsProps {
  selected: ProfileTab
  onChange: (tab: ProfileTab) => void
}

export default function ProfileTabs({ selected, onChange }: ProfileTabsProps) {
  return (
    <div className="flex border-b yg-border-canvas-100">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "relative px-4 py-2.5 text-sm font-medium transition-colors",
            selected === tab.value
              ? "yg-text-primary-500 yegeon-tab-active"
              : "yg-text-ink-400 hover:yg-text-ink-800"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
