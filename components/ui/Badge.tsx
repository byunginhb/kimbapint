import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "region";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  pulse?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-800 text-neutral-300",
  success: "bg-green-500/10 text-green-500 border border-green-500/20",
  warning: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
  danger: "bg-red-500/10 text-red-500 border border-red-500/20",
  info: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  region: "bg-neutral-800 text-neutral-300 border border-neutral-700",
};

export function Badge({ children, variant = "default", className, pulse }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              variant === "success" && "bg-green-500",
              variant === "warning" && "bg-yellow-500",
              variant === "danger" && "bg-red-500",
              variant === "info" && "bg-blue-500",
              variant === "default" && "bg-neutral-500"
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-2 w-2 rounded-full",
              variant === "success" && "bg-green-500",
              variant === "warning" && "bg-yellow-500",
              variant === "danger" && "bg-red-500",
              variant === "info" && "bg-blue-500",
              variant === "default" && "bg-neutral-500"
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}

interface LiveBadgeProps {
  className?: string;
}

export function LiveBadge({ className }: LiveBadgeProps) {
  return (
    <Badge variant="danger" pulse className={className}>
      LIVE
    </Badge>
  );
}

interface TrendBadgeProps {
  trend: "up" | "down" | "stable";
  value?: string;
  className?: string;
}

export function TrendBadge({ trend, value, className }: TrendBadgeProps) {
  const trendConfig = {
    up: { icon: "↑", variant: "success" as const, label: "상승" },
    down: { icon: "↓", variant: "danger" as const, label: "하락" },
    stable: { icon: "→", variant: "default" as const, label: "유지" },
  };

  const config = trendConfig[trend];

  return (
    <Badge variant={config.variant} className={className}>
      {config.icon} {value || config.label}
    </Badge>
  );
}
