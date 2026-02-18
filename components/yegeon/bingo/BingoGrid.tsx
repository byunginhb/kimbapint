import type { BingoCellData, BingoLineData } from "@/lib/yegeon-types"
import BingoCell from "./BingoCell"

interface BingoGridProps {
  grid: BingoCellData[]
  lines: BingoLineData[]
}

const ROW_COUNT = 5
const COL_COUNT = 5

function LineProbLabel({ line, className }: { line: BingoLineData; className?: string }) {
  const probText = line.isComplete
    ? "100%"
    : line.isBlocked
      ? "0%"
      : `${(line.probability * 100).toFixed(1)}%`

  const colorClass = line.isComplete
    ? "yg-text-yes-500"
    : line.isBlocked
      ? "yg-text-ink-300"
      : "yg-text-no-400"

  return (
    <span
      className={`flex items-center justify-center text-xs font-medium tabular-nums ${colorClass} ${className ?? ""}`}
    >
      {probText}
    </span>
  )
}

export default function BingoGrid({ grid, lines }: BingoGridProps) {
  const rowLines = lines.slice(0, ROW_COUNT)
  const colLines = lines.slice(ROW_COUNT, ROW_COUNT + COL_COUNT)
  const diagLines = lines.slice(ROW_COUNT + COL_COUNT)

  return (
    <div className="yegeon-bingo-grid-wrapper">
      {/* 5x5 grid + row probs on right */}
      <div className="flex flex-col gap-[3px]">
        {[0, 1, 2, 3, 4].map((row) => (
          <div key={row} className="flex gap-[3px]">
            {[0, 1, 2, 3, 4].map((col) => {
              const index = row * 5 + col
              return <BingoCell key={index} cell={grid[index]} index={index} />
            })}
            {/* Row probability */}
            <div className="flex w-14 shrink-0 items-center justify-center">
              <LineProbLabel line={rowLines[row]} />
            </div>
          </div>
        ))}

        {/* Column probs + diagonal corner */}
        <div className="flex gap-[3px] mt-0.5">
          {colLines.map((line, i) => (
            <div key={i} className="yegeon-bingo-cell-size flex items-center justify-center">
              <LineProbLabel line={line} />
            </div>
          ))}
          {/* Diagonal probs in right corner */}
          <div className="flex w-14 shrink-0 items-center justify-center gap-2">
            <div className="flex flex-col items-center text-[10px]">
              <span className="yg-text-ink-400">\</span>
              <LineProbLabel line={diagLines[0]} className="!text-[10px]" />
            </div>
            <div className="flex flex-col items-center text-[10px]">
              <span className="yg-text-ink-400">/</span>
              <LineProbLabel line={diagLines[1]} className="!text-[10px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
