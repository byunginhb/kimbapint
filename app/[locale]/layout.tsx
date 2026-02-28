import type { Metadata } from "next"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import localFont from "next/font/local"
import { routing } from "@/i18n/routing"
import GoogleTranslate from "@/components/common/GoogleTranslate"
import { AppThemeProvider } from "@/components/common/ThemeProvider"
import "../globals.css"

const neoDunggeunmo = localFont({
  src: [
    {
      path: "../../font/NeoDunggeunmoPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neo-dunggeunmo",
  display: "swap",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  const messages = {
    ...(await import(`../../messages/${locale}/common.json`)).default,
    ...(await import(`../../messages/${locale}/navigation.json`)).default,
    ...(await import(`../../messages/${locale}/dashboard.json`)).default,
    ...(await import(`../../messages/${locale}/pages.json`)).default,
    ...(await import(`../../messages/${locale}/yegeon.json`)).default,
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("kimbapint-theme");if(t==="light")document.documentElement.classList.add("light")}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${neoDunggeunmo.variable} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppThemeProvider>
            <GoogleTranslate />
            {children}
          </AppThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
