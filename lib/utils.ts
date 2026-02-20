import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function toLocaleCode(locale: string): string {
  return locale === "ko" ? "ko-KR" : "en-US";
}

export function formatNumber(num: number, locale = "ko"): string {
  return new Intl.NumberFormat(toLocaleCode(locale)).format(num);
}

export function formatCurrency(num: number, locale = "ko"): string {
  const loc = toLocaleCode(locale);
  const currency = locale === "ko" ? "KRW" : "USD";
  return new Intl.NumberFormat(loc, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatPercent(num: number): string {
  return `${(num * 100).toFixed(1)}%`;
}

export function formatDate(date: string | Date, locale = "ko"): string {
  return new Intl.DateTimeFormat(toLocaleCode(locale), {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: string | Date, locale = "ko"): string {
  const loc = locale === "ko" ? "ko" : "en";
  const rtf = new Intl.RelativeTimeFormat(loc, { numeric: "auto" });
  const diff = new Date(date).getTime() - Date.now();
  const absDiff = Math.abs(diff);

  if (absDiff < 60000) return rtf.format(0, "minute");
  if (absDiff < 3600000) return rtf.format(Math.round(diff / 60000), "minute");
  if (absDiff < 86400000) return rtf.format(Math.round(diff / 3600000), "hour");
  if (absDiff < 604800000) return rtf.format(Math.round(diff / 86400000), "day");
  return formatDate(date, locale);
}
