"use client";

import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-ki-elevated bg-ki-surface-alt/50">
      {/* 상단 링크 섹션 */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-6">
          <a
            href="#"
            className="flex items-center gap-1.5 text-ki-text-secondary hover:text-ki-text transition-colors text-xs font-mono"
          >
            <span className="text-purple-400">Polymarket</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-ki-text-secondary hover:text-ki-text transition-colors text-xs font-mono"
          >
            <span>Dioxus</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-ki-text-muted text-xs font-mono">&bull;</span>
          <span className="text-red-400 text-xs font-mono">
            Don&apos;t Trust
          </span>
          <span className="text-yellow-400 text-xs font-mono">Verify</span>
        </div>

        {/* 면책 조항 */}
        <div className="text-center mb-4">
          <p className="text-ki-text-muted text-xs font-mono leading-relaxed max-w-2xl mx-auto">
            {t("disclaimer")}
          </p>
        </div>

        {/* 하단 정보 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs font-mono text-ki-text-muted">
          <span>&copy; 2025 KimbapINT</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="flex items-center gap-1">
            <span>🇰🇷</span>
            <span>{t("madeIn")}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
