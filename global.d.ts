import type { routing } from "@/i18n/routing"
import type ko_common from "./messages/ko/common.json"
import type ko_navigation from "./messages/ko/navigation.json"
import type ko_dashboard from "./messages/ko/dashboard.json"
import type ko_pages from "./messages/ko/pages.json"
import type ko_yegeon from "./messages/ko/yegeon.json"

type Messages = typeof ko_common &
  typeof ko_navigation &
  typeof ko_dashboard &
  typeof ko_pages &
  typeof ko_yegeon

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: Messages
  }
}
