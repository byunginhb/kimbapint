import { User } from "lucide-react"

const AVATAR_HUES = [0, 45, 120, 200, 260, 300, 340, 170] as const

function getAvatarColor(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = AVATAR_HUES[Math.abs(hash) % AVATAR_HUES.length]
  return `hsl(${hue}, 65%, 50%)`
}

interface UserAvatarProps {
  size?: number
  className?: string
  displayName?: string
  colorSeed?: string
}

export default function UserAvatar({
  size = 32,
  className = "",
  displayName,
  colorSeed,
}: UserAvatarProps) {
  const iconSize = Math.round(size * 0.55)

  if (displayName) {
    const initial = displayName.charAt(0).toUpperCase()
    const bgColor = getAvatarColor(colorSeed ?? displayName)
    const fontSize = Math.round(size * 0.45)

    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-full ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: bgColor,
        }}
      >
        <span
          className="font-bold leading-none text-white"
          style={{ fontSize }}
        >
          {initial}
        </span>
      </div>
    )
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full yg-bg-canvas-100 ${className}`}
      style={{ width: size, height: size }}
    >
      <User className="yg-text-ink-400" style={{ width: iconSize, height: iconSize }} />
    </div>
  )
}
