import { useLocale } from "next-intl"
import { Calendar, Users } from "lucide-react"
import UserAvatar from "../common/UserAvatar"
import { formatDate } from "@/lib/utils"
import type { YeGeonUser } from "@/lib/yegeon-types"

interface ProfileHeaderProps {
  user: YeGeonUser
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const locale = useLocale()

  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <UserAvatar size={80} />

      <div className="flex-1">
        <h1 className="text-xl font-bold yg-text-ink-1000">{user.displayName}</h1>
        <p className="text-sm yg-text-ink-400">@{user.username}</p>
        <p className="mt-1 text-sm yg-text-ink-600">{user.bio}</p>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs yg-text-ink-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(user.createdAt, locale)} 가입
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span className="font-medium yg-text-ink-800">
              {user.followersCount.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}
            </span>
            팔로워
          </span>
          <span>
            <span className="font-medium yg-text-ink-800">
              {user.followingCount.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")}
            </span>{" "}
            팔로잉
          </span>
        </div>
      </div>

      <button className="rounded-lg yg-bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:yg-bg-primary-600">
        팔로우
      </button>
    </div>
  )
}
