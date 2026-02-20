import { useLocale } from "next-intl"
import { TrendingUp, MessageCircle, Reply, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { getUserByUsername } from "@/lib/yegeon-data"
import { formatRelativeTime } from "@/lib/utils"
import type { YeGeonNotification, NotificationType } from "@/lib/yegeon-types"
import UserAvatar from "@/components/yegeon/common/UserAvatar"

const TYPE_ICONS: Record<NotificationType, React.ReactNode> = {
  trade: <TrendingUp className="h-4 w-4" />,
  comment: <MessageCircle className="h-4 w-4" />,
  reply: <Reply className="h-4 w-4" />,
  follow: <UserPlus className="h-4 w-4" />,
}

interface NotificationItemProps {
  notification: YeGeonNotification
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const locale = useLocale()
  const user = getUserByUsername(notification.fromUsername)

  return (
    <div
      className={cn(
        "yegeon-row-hover flex items-start gap-3 px-4 py-3",
        !notification.isRead && "yg-bg-primary-100/20",
      )}
    >
      {/* Avatar */}
      <UserAvatar
        size={36}
        displayName={user?.displayName}
        colorSeed={user?.username}
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-sm yg-text-ink-900">{notification.message}</p>
        {notification.marketTitle && (
          <p className="mt-0.5 truncate text-xs yg-text-ink-400">
            {notification.marketTitle}
          </p>
        )}
        <div className="mt-1 flex items-center gap-1.5 text-xs yg-text-ink-400">
          <span className="yg-text-primary-500">
            {TYPE_ICONS[notification.type]}
          </span>
          <span>{formatRelativeTime(notification.timestamp, locale)}</span>
        </div>
      </div>

      {/* Unread dot */}
      {!notification.isRead && (
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full yg-bg-primary-500" />
      )}
    </div>
  )
}
