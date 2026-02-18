"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"

type Theme = "light" | "dark"

interface ThemeContextValue {
  theme: Theme
  mounted: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "yegeon-theme"

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return ctx
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let resolved: Theme = "light"

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === "light" || stored === "dark") {
        resolved = stored
      }
    } catch {
      // localStorage unavailable
    }

    setTheme(resolved)
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light"
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // localStorage unavailable
      }
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function YeGeonRoot({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { theme, mounted } = useTheme()

  return (
    <div
      className={`yegeon-root${theme === "dark" ? " dark" : ""}${className ? ` ${className}` : ""}`}
      style={mounted ? undefined : { visibility: "hidden" }}
    >
      {children}
    </div>
  )
}
