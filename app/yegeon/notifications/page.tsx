import { Bell } from "lucide-react"
import { getNotifications, getUnreadNotificationCount } from "@/lib/yegeon-data"
import NotificationItem from "@/components/yegeon/notifications/NotificationItem"

export default function NotificationsPage() {
  const notifications = getNotifications()
  const unreadCount = getUnreadNotificationCount()

  return (
    <div className="px-4 py-6">
      <div className="mb-4 flex items-center gap-3">
        <h1 className="text-xl font-bold yg-text-ink-900">알림</h1>
        {unreadCount > 0 && (
          <span className="rounded-full yg-bg-primary-500 px-2 py-0.5 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20">
          <Bell className="h-10 w-10 yg-text-ink-300" />
          <p className="text-sm yg-text-ink-500">알림이 없습니다</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border yg-border-canvas-100">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>
      )}
    </div>
  )
}
