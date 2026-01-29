import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "국방부 김밥 지수 - 실시간 군사 긴장 지표 | KimbapINT",
  description: "국방부 김밥 지수(KimbapINT)는 국방부 주변 김밥집 인기도를 추적하여 군사 활동의 비공식 OSINT 지표를 제공합니다. 김밥콘 레벨을 모니터링하고 비정상적인 활동을 감지하세요.",
  keywords: ["국방부 김밥 지수", "kimbapint", "군사 긴장 지표", "osint 대시보드", "지정학 모니터링"],
  openGraph: {
    title: "국방부 김밥 지수 - 실시간 OSINT 대시보드",
    description: "국방부 주변 김밥집 인기도를 지정학적 지표로 추적합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
