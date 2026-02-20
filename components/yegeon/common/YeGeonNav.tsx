"use client"

import { useState, useEffect, useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { Search, Menu, Globe } from "lucide-react"
import { useSidebar } from "./SidebarContext"

const LOCALE_OPTIONS = [
  { value: "ko" as const, flag: "🇰🇷", label: "한국어" },
  { value: "en" as const, flag: "🇺🇸", label: "English" },
]

export default function YeGeonNav() {
  const { toggle } = useSidebar()
  const t = useTranslations("yNav")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const [langOpen, setLangOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentOption = LOCALE_OPTIONS.find((o) => o.value === locale) ?? LOCALE_OPTIONS[0]

  function switchLocale(newLocale: "ko" | "en") {
    setLangOpen(false)
    router.replace(pathname, { locale: newLocale })
  }

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

        <div className="flex items-center gap-1">
          {/* 언어 전환 */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm yg-text-ink-400 transition-colors hover:yg-bg-canvas-50 hover:yg-text-ink-1000"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">{currentOption.flag}</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-1 z-50 min-w-[140px] overflow-hidden rounded-lg border yg-border-canvas-100 yg-bg-canvas-0 shadow-lg">
                {LOCALE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => switchLocale(option.value)}
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                      option.value === locale
                        ? "yg-bg-canvas-50 font-medium yg-text-ink-1000"
                        : "yg-text-ink-500 hover:yg-bg-canvas-50 hover:yg-text-ink-900"
                    }`}
                  >
                    <span>{option.flag}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button aria-label={t("search")} className="rounded-lg p-2 yg-text-ink-400">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}
