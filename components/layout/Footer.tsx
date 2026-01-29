"use client";

import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/50">
      {/* 상단 링크 섹션 */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-6">
          <a
            href="#"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs font-mono"
          >
            <span className="text-purple-400">Polymarket</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="#"
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs font-mono"
          >
            <span>Dioxus</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-gray-600 text-xs font-mono">•</span>
          <span className="text-red-400 text-xs font-mono">
            Don&apos;t Trust
          </span>
          <span className="text-yellow-400 text-xs font-mono">Verify</span>
        </div>

        {/* 면책 조항 */}
        <div className="text-center mb-4">
          <p className="text-gray-500 text-xs font-mono leading-relaxed max-w-2xl mx-auto">
            이 사이트는 <span className="text-gray-400">프로토타입</span>{" "}
            목적으로 제작되었습니다. 실제 군사 정보와 무관하며, 모든 데이터는
            가상입니다.
          </p>
        </div>

        {/* 하단 정보 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs font-mono text-gray-600">
          <span>© 2025 KimbapINT</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            <span>🇰🇷</span>
            <span>Made in Korea</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
