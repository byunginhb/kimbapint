"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { BingoCellData } from "@/lib/yegeon-types"
import { FREE_SPACE_INDEX } from "@/lib/yegeon-bingo-utils"
import BingoCell from "./BingoCell"

interface SortableBingoCellProps {
  id: string
  cell: BingoCellData
  index: number
}

export default function SortableBingoCell({ id, cell, index }: SortableBingoCellProps) {
  const isFreeSpace = index === FREE_SPACE_INDEX
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id,
    disabled: isFreeSpace,
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    flex: "1 1 0%",
    minWidth: 0,
  }

  const stateClass = isDragging
    ? "yegeon-bingo-sortable-wrapper yegeon-bingo-cell-dragging"
    : isOver
      ? "yegeon-bingo-sortable-wrapper yegeon-bingo-cell-over"
      : "yegeon-bingo-sortable-wrapper"

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={stateClass}
      {...attributes}
      {...listeners}
    >
      <BingoCell cell={cell} index={index} isEditing />
    </div>
  )
}
