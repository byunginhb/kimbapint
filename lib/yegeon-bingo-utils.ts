import type { BingoCellData, BingoLineData } from "./yegeon-types"

export const FREE_SPACE_INDEX = 12

export const BINGO_LINES: { name: string; indices: number[] }[] = [
  { name: "행 1", indices: [0, 1, 2, 3, 4] },
  { name: "행 2", indices: [5, 6, 7, 8, 9] },
  { name: "행 3", indices: [10, 11, 12, 13, 14] },
  { name: "행 4", indices: [15, 16, 17, 18, 19] },
  { name: "행 5", indices: [20, 21, 22, 23, 24] },
  { name: "열 1", indices: [0, 5, 10, 15, 20] },
  { name: "열 2", indices: [1, 6, 11, 16, 21] },
  { name: "열 3", indices: [2, 7, 12, 17, 22] },
  { name: "열 4", indices: [3, 8, 13, 18, 23] },
  { name: "열 5", indices: [4, 9, 14, 19, 24] },
  { name: "대각 \\", indices: [0, 6, 12, 18, 24] },
  { name: "대각 /", indices: [4, 8, 12, 16, 20] },
]

export function calculateLineProbability(
  grid: BingoCellData[],
  indices: number[],
): number {
  return indices.reduce((acc, i) => {
    if (i === FREE_SPACE_INDEX) return acc * 1.0
    const cell = grid[i]
    if (cell.resolved === true) return acc * 1.0
    if (cell.resolved === false) return acc * 0.0
    return acc * cell.prob
  }, 1)
}

export function analyzeLine(
  grid: BingoCellData[],
  indices: number[],
): BingoLineData {
  const probability = calculateLineProbability(grid, indices)
  const cells = indices.map((i) => grid[i])
  const yesCount = cells.filter(
    (c) => c.resolved === true || c.status === "free_space",
  ).length
  const noCount = cells.filter((c) => c.resolved === false).length

  return {
    indices,
    probability,
    isComplete: yesCount === 5,
    isBlocked: noCount > 0,
  }
}

export function analyzeAllLines(grid: BingoCellData[]): BingoLineData[] {
  return BINGO_LINES.map((line) => analyzeLine(grid, line.indices))
}

export function calculateWinProbability(grid: BingoCellData[]): number {
  const lines = analyzeAllLines(grid)
  const probAllLinesFail = lines.reduce((acc, line) => {
    return acc * (1 - line.probability)
  }, 1)
  return 1 - probAllLinesFail
}
