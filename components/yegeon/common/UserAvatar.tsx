import { User } from "lucide-react"

interface UserAvatarProps {
  size?: number
  className?: string
}

export default function UserAvatar({ size = 32, className = "" }: UserAvatarProps) {
  const iconSize = Math.round(size * 0.55)

  return (
    <div
      className={`flex items-center justify-center rounded-full yg-bg-canvas-100 ${className}`}
      style={{ width: size, height: size }}
    >
      <User className="yg-text-ink-400" style={{ width: iconSize, height: iconSize }} />
    </div>
  )
}
