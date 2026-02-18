import Link from "next/link"

export default function YeGeonFooter() {
  return (
    <footer className="border-t yg-border-canvas-100 yg-bg-canvas-0">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold yg-text-primary-500">예견</span>
            <span className="text-sm yg-text-ink-400">YeGeon</span>
          </div>

          <div className="flex items-center gap-6 text-sm yg-text-ink-400">
            <span className="cursor-default hover:yg-text-ink-600">이용약관</span>
            <span className="cursor-default hover:yg-text-ink-600">
              개인정보처리방침
            </span>
            <span className="cursor-default hover:yg-text-ink-600">문의</span>
            <Link
              href="/"
              className="yg-text-primary-500 hover:yg-text-primary-400"
            >
              KimbapINT
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center text-xs yg-text-ink-300">
          예견은 실제 화폐를 사용하지 않는 가상 예측 마켓입니다.
        </div>
      </div>
    </footer>
  )
}
