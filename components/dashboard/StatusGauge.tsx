"use client";

interface StatusGaugeProps {
  status: string;
  percentage: number;
}

export function StatusGauge({ status, percentage }: StatusGaugeProps) {
  // 게이지 색상 계산 (녹색 -> 노란색 -> 빨간색)
  const getGaugeColor = (pct: number) => {
    if (pct < 30) return "from-green-500 to-green-400";
    if (pct < 60) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };

  const gaugeColor = getGaugeColor(percentage);

  // 반원 게이지 각도 계산 (0% = -90deg, 100% = 90deg)
  const angle = (percentage / 100) * 180 - 90;

  return (
    <div className="bg-ki-surface-alt/60 border border-ki-border-subtle rounded-lg p-4">
      <div className="flex flex-col items-center">
        {/* 상태 텍스트 */}
        <div className="text-sm font-mono mb-4">
          <span className="text-ki-text-secondary">Status: </span>
          <span className="text-ki-text">{status}</span>
        </div>

        {/* 반원 게이지 */}
        <div className="relative w-48 h-24 mb-2">
          {/* 배경 반원 */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="w-48 h-48 rounded-full border-8 border-ki-border-subtle"
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 0, 0 0)",
              }}
            />
          </div>

          {/* 게이지 값 반원 */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`w-48 h-48 rounded-full border-8 border-transparent bg-gradient-to-r ${gaugeColor}`}
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 0, 0 0)",
                background: `conic-gradient(from -90deg, #22c55e ${percentage}%, transparent ${percentage}%)`,
                borderColor: "transparent",
              }}
            />
          </div>

          {/* 중앙 원 */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-ki-surface-alt rounded-t-full" />

          {/* 바늘 */}
          <div
            className="absolute bottom-0 left-1/2 origin-bottom w-1 h-20 bg-gradient-to-t from-ki-text to-ki-text-secondary rounded-full"
            style={{
              transform: `translateX(-50%) rotate(${angle}deg)`,
              transformOrigin: "bottom center",
            }}
          />

          {/* 중앙 점 */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-ki-text rounded-full shadow-lg" />

          {/* 퍼센트 표시 */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-2xl font-bold text-ki-text font-mono">
            {percentage}%
          </div>
        </div>

        {/* 레이블 */}
        <div className="flex justify-between w-full text-xs text-ki-text-muted font-mono px-2">
          <span>SAFE</span>
          <span>ELEVATED</span>
          <span>CRITICAL</span>
        </div>
      </div>
    </div>
  );
}
