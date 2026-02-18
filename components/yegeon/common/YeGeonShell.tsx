"use client"

import { type ReactNode, useEffect } from "react"
import { SidebarProvider, useSidebar } from "./SidebarContext"
import YeGeonNav from "./YeGeonNav"
import YeGeonFooter from "./YeGeonFooter"
import YeGeonSidebar from "./YeGeonSidebar"

function ShellInner({ children }: { children: ReactNode }) {
  const { open, close } = useSidebar()

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, close])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav — mobile only */}
      <div className="lg:hidden">
        <YeGeonNav />
      </div>

      <div className="flex flex-1">
        {/* Desktop sidebar — always visible at lg+, full height */}
        <div className="hidden w-64 shrink-0 yg-bg-canvas-0 lg:block">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <YeGeonSidebar />
          </div>
        </div>

        {/* Mobile overlay drawer */}
        {open && (
          <>
            <div
              className="fixed inset-0 z-40 sidebar-overlay lg:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              onClick={close}
              role="presentation"
            />
            <div className="fixed inset-y-0 left-0 z-50 w-64 yg-bg-canvas-0 shadow-xl sidebar-drawer lg:hidden">
              <YeGeonSidebar onNavigate={close} />
            </div>
          </>
        )}

        {/* Main content area */}
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1">{children}</main>
          <YeGeonFooter />
        </div>
      </div>
    </div>
  )
}

export default function YeGeonShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <ShellInner>{children}</ShellInner>
    </SidebarProvider>
  )
}
