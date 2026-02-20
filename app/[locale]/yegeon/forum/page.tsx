import { MessageSquare } from "lucide-react"

export default function ForumPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-20">
      <div className="flex h-16 w-16 items-center justify-center rounded-full yg-bg-canvas-50">
        <MessageSquare className="h-8 w-8 yg-text-ink-400" />
      </div>
      <h1 className="text-xl font-bold yg-text-ink-900">포럼</h1>
      <p className="text-sm yg-text-ink-500">준비중입니다</p>
    </div>
  )
}
