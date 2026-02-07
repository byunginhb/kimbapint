import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { ThemeProvider, YeGeonRoot } from "@/components/yegeon/ThemeContext"
import "./yegeon.css"

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
})

export const metadata: Metadata = {
  title: "예견 (YeGeon) - 한국형 예측 시장",
  description:
    "예견은 한국 정치, 경제, 문화, 스포츠에 대한 예측 마켓 플랫폼입니다. 집단지성으로 미래를 예측하세요.",
}

export default function YeGeonLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider>
      <YeGeonRoot className={figtree.variable}>
        {children}
      </YeGeonRoot>
    </ThemeProvider>
  )
}
