"use client";

import { useTranslations } from "next-intl";
import { ExternalLink, TrendingUp } from "lucide-react";

export function FeatureCards() {
  const t = useTranslations("featureCards");

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* POLY GLOBE 카드 */}
        <div className="bg-ki-surface-alt/40 border border-ki-border-subtle rounded-xl p-6 lg:p-8 hover:border-ki-border-subtle transition-colors">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 relative">
              <div className="w-32 h-32 lg:w-40 lg:h-40 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <radialGradient id="globeGrad" cx="40%" cy="40%">
                      <stop offset="0%" stopColor="#1e3a5f" />
                      <stop offset="100%" stopColor="#0c1929" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="url(#globeGrad)" />
                  <g fill="#22c55e" opacity="0.7">
                    <rect x="25" y="30" width="3" height="3" />
                    <rect x="30" y="28" width="3" height="3" />
                    <rect x="35" y="32" width="3" height="3" />
                    <rect x="55" y="40" width="3" height="3" />
                    <rect x="60" y="38" width="3" height="3" />
                    <rect x="65" y="42" width="3" height="3" />
                    <rect x="40" y="55" width="3" height="3" />
                    <rect x="45" y="58" width="3" height="3" />
                  </g>
                  <g>
                    <circle cx="30" cy="35" r="2" fill="#06b6d4" />
                    <circle cx="60" cy="45" r="2" fill="#06b6d4" />
                    <circle cx="45" cy="60" r="2" fill="#06b6d4" />
                    <circle cx="70" cy="50" r="2" fill="#f97316" />
                    <circle cx="35" cy="50" r="2" fill="#22c55e" />
                  </g>
                </svg>
              </div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                <p
                  className="text-2xl lg:text-3xl font-bold text-blue-400 leading-none"
                  style={{ fontFamily: "var(--font-vt323)" }}
                >
                  POLY
                </p>
                <p
                  className="text-3xl lg:text-4xl font-bold text-blue-500 leading-none"
                  style={{ fontFamily: "var(--font-vt323)" }}
                >
                  GLOBE
                </p>
              </div>
            </div>

            <p className="text-ki-text-secondary text-sm lg:text-base mb-6 max-w-xs">
              {t("polyGlobeDesc")}
            </p>

            <hr className="w-full border-ki-border-subtle mb-6" />

            <a
              href="#"
              className="flex items-center gap-2 text-ki-text-secondary hover:text-ki-text transition-colors font-mono text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              {t("polyGlobeEnter")}
            </a>
          </div>
        </div>

        {/* Mention HUB 카드 */}
        <div className="bg-ki-surface-alt/40 border border-ki-border-subtle rounded-xl p-6 lg:p-8 hover:border-ki-border-subtle transition-colors">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 relative">
              <div className="w-32 h-32 lg:w-40 lg:h-40 relative flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <ellipse cx="45" cy="40" rx="18" ry="22" fill="#f5d5a0" />
                  <path d="M28 30 Q35 15 55 25 Q65 28 63 35 L60 32 Q50 20 35 28 Z" fill="#f5c542" />
                  <path d="M25 65 L35 55 L45 60 L55 55 L65 65 L65 100 L25 100 Z" fill="#1e293b" />
                  <path d="M42 60 L48 60 L50 85 L45 90 L40 85 Z" fill="#dc2626" />
                  <path d="M38 55 L52 55 L50 65 L45 65 L40 65 Z" fill="#ffffff" />
                  <rect x="68" y="50" width="3" height="25" fill="#374151" />
                  <ellipse cx="70" cy="48" rx="5" ry="4" fill="#4b5563" />
                </svg>
              </div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2">
                <p
                  className="text-xl lg:text-2xl font-bold text-orange-400 leading-none"
                  style={{ fontFamily: "var(--font-vt323)" }}
                >
                  Mention
                </p>
                <p
                  className="text-3xl lg:text-4xl font-bold text-ki-text leading-none"
                  style={{ fontFamily: "var(--font-vt323)" }}
                >
                  HUB
                </p>
              </div>
            </div>

            <p className="text-ki-text-secondary text-sm lg:text-base mb-6 max-w-xs">
              {t("trumpDesc")}
            </p>

            <hr className="w-full border-ki-border-subtle mb-6" />

            <a
              href="#"
              className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-mono text-sm"
            >
              <TrendingUp className="w-4 h-4" />
              {t("trumpExplore")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
