"use client"

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import type { BingoCellData, BingoLineData } from "@/lib/yegeon-types"
import { FREE_SPACE_INDEX } from "@/lib/yegeon-bingo-utils"
import BingoCell from "./BingoCell"
import SortableBingoCell from "./SortableBingoCell"

interface BingoGridProps {
  grid: BingoCellData[]
  lines: BingoLineData[]
  isEditing?: boolean
  onSwapCells?: (fromIndex: number, toIndex: number) => void
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
      className={`flex items-center justify-center text-[10px] font-medium tabular-nums ${colorClass} ${className ?? ""}`}
    >
      {probText}
    </span>
  )
}

export default function BingoGrid({ grid, lines, isEditing, onSwapCells }: BingoGridProps) {
  const rowLines = lines.slice(0, ROW_COUNT)
  const colLines = lines.slice(ROW_COUNT, ROW_COUNT + COL_COUNT)

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 8 },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 200, tolerance: 5 },
  })
  const sensors = useSensors(pointerSensor, touchSensor)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const fromIndex = Number(active.id)
    const toIndex = Number(over.id)
    if (fromIndex === FREE_SPACE_INDEX || toIndex === FREE_SPACE_INDEX) return
    onSwapCells?.(fromIndex, toIndex)
  }

  const sortableIds = Array.from({ length: 25 }, (_, i) => String(i))

  const gridContent = (
    <div className="flex flex-col gap-[3px]">
      {[0, 1, 2, 3, 4].map((row) => (
        <div key={row} className="flex gap-[3px]">
          <div className="flex flex-1 gap-[3px]">
            {isEditing ? (
              [0, 1, 2, 3, 4].map((col) => {
                const index = row * 5 + col
                return (
                  <SortableBingoCell
                    key={index}
                    id={String(index)}
                    cell={grid[index]}
                    index={index}
                  />
                )
              })
            ) : (
              [0, 1, 2, 3, 4].map((col) => {
                const index = row * 5 + col
                return <BingoCell key={index} cell={grid[index]} index={index} />
              })
            )}
          </div>
          {/* Row probability */}
          <div className="flex w-10 shrink-0 items-center justify-center">
            <LineProbLabel line={rowLines[row]} />
          </div>
        </div>
      ))}

      {/* Column probs */}
      <div className="flex gap-[3px] mt-0.5">
        <div className="flex flex-1 gap-[3px]">
          {colLines.map((line, i) => (
            <div key={i} className="yegeon-bingo-cell-size flex items-center justify-center">
              <LineProbLabel line={line} />
            </div>
          ))}
        </div>
        {/* Spacer to align with row probability column */}
        <div className="w-10 shrink-0" />
      </div>
    </div>
  )

  return (
    <div className="yegeon-bingo-grid-wrapper">
      {isEditing ? (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={sortableIds} strategy={rectSortingStrategy}>
            {gridContent}
          </SortableContext>
        </DndContext>
      ) : (
        gridContent
      )}
    </div>
  )
}
