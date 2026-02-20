"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Search, Menu } from "lucide-react"
import { useSidebar } from "./SidebarContext"

export default function YeGeonNav() {
  const { toggle } = useSidebar()
  const t = useTranslations("yNav")

  return (
    <nav className="sticky top-0 z-30 border-b yg-border-canvas-100 yg-bg-canvas-0">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label={t("openMenu")}
            className="rounded-lg p-2 yg-text-ink-400 transition-colors hover:yg-bg-canvas-50 hover:yg-text-ink-1000"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/yegeon" className="flex items-center gap-2">
            <span className="yegeon-logo text-xl font-extrabold tracking-widest">
              YEGEON
            </span>
          </Link>
        </div>

        <button aria-label={t("search")} className="rounded-lg p-2 yg-text-ink-400">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </nav>
  )
}
