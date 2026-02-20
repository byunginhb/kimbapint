"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export function BackButton({ href, label }: BackButtonProps) {
  const t = useTranslations("pageCommon");
  const displayLabel = label ?? t("back");
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-1.5 text-gray-400 hover:text-white transition-colors font-mono text-sm"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{displayLabel}</span>
    </button>
  );
}
