"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import type { MarketOption } from "@/lib/yegeon-types"
import {
  formatCurrency,
  calculateExpectedProfit,
  formatPresetAmount,
} from "@/lib/yegeon-utils"
import { Spinner, CheckCircleIcon } from "./BettingIcons"

type BetState = "idle" | "confirming" | "submitting" | "success"

const SUCCESS_RESET_MS = 3000
const MIN_SUBMIT_DELAY_MS = 1000
const SUBMIT_JITTER_MS = 500
const PRESET_AMOUNTS = [1000, 5000, 10000, 50000]

interface MultipleChoiceProps {
  options: MarketOption[]
}

export default function MultipleChoice({ options }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [amount, setAmount] = useState<string>("1000")
  const [betState, setBetState] = useState<BetState>("idle")

  const sorted = [...options].sort((a, b) => b.probability - a.probability)

  const numericAmount = Number(amount) || 0
  const selectedOption = options.find((o) => o.id === selected)
  const expectedProfit = selectedOption
    ? calculateExpectedProfit(numericAmount, selectedOption.probability)
    : 0

  const resetBet = useCallback(() => {
    setBetState("idle")
    setSelected(null)
    setAmount("1000")
  }, [])

  useEffect(() => {
    if (betState !== "success") return
    const timer = setTimeout(resetBet, SUCCESS_RESET_MS)
    return () => clearTimeout(timer)
  }, [betState, resetBet])

  const handleBetClick = () => {
    if (betState === "idle") {
      setBetState("confirming")
      return
    }

    if (betState === "confirming") {
      setBetState("submitting")
      const delay = MIN_SUBMIT_DELAY_MS + Math.random() * SUBMIT_JITTER_MS
      setTimeout(() => setBetState("success"), delay)
    }
  }

  const handleCancel = () => {
    setBetState("idle")
  }

  const isDisabled = betState === "submitting"

  if (betState === "success" && selectedOption) {
    const percent = Math.round(selectedOption.probability * 100)

    return (
      <div className="rounded-lg border yg-border-canvas-100 yg-bg-canvas-50/50 p-4">
        <div className="flex flex-col items-center gap-3 py-6">
          <div style={{ color: selectedOption.color }}>
            <CheckCircleIcon />
          </div>
          <span className="text-lg font-bold yg-text-ink-900 animate-bet-fade">
            베팅 완료!
          </span>
          <div
            className="flex flex-col items-center gap-1 animate-bet-fade"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: selectedOption.color }}
              />
              <span className="text-sm font-medium yg-text-ink-800">
                {selectedOption.label}
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: selectedOption.color }}
              >
                {percent}%
              </span>
            </div>
            <span className="text-sm yg-text-ink-600">
              {formatCurrency(numericAmount)}
            </span>
            <span className="text-xs yg-text-ink-400">
              예상 수익 {formatCurrency(expectedProfit)}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border yg-border-canvas-100 yg-bg-canvas-50/50 p-4">
      <h3 className="mb-3 text-sm font-medium yg-text-ink-600">선택지</h3>

      <div className="flex flex-col gap-2">
        {sorted.map((option) => {
          const percent = Math.round(option.probability * 100)
          const isSelected = selected === option.id

          return (
            <button
              key={option.id}
              onClick={() => {
                if (!isDisabled) {
                  setSelected(isSelected ? null : option.id)
                  if (betState === "confirming") setBetState("idle")
                }
              }}
              disabled={isDisabled}
              className={cn(
                "relative overflow-hidden rounded-lg border px-4 py-3 text-left transition-all",
                isSelected
                  ? "yg-border-primary-500 yg-bg-primary-100/20"
                  : "yg-border-canvas-100 yg-bg-canvas-50 hover:yg-border-canvas-50",
                isDisabled && "opacity-60"
              )}
            >
              <div
                className="absolute inset-y-0 left-0 opacity-10 transition-all"
                style={{
                  width: `${percent}%`,
                  backgroundColor: option.color,
                }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                  <span className="text-sm font-medium yg-text-ink-800">
                    {option.label}
                  </span>
                </div>

                <span
                  className="text-lg font-bold tabular-nums"
                  style={{ color: option.color }}
                >
                  {percent}%
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {selected && (
        <div className="mt-3">
          <div className="mb-3">
            <label className="mb-1.5 block text-xs yg-text-ink-400">
              투자 금액
            </label>
            <div className="flex items-center gap-2 rounded-lg border yg-border-canvas-100 yg-bg-canvas-50 px-3 py-2">
              <span className="text-sm yg-text-ink-400">₩</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "")
                  setAmount(val)
                  if (betState === "confirming") setBetState("idle")
                }}
                disabled={isDisabled}
                aria-label="투자 금액 입력"
                className="flex-1 bg-transparent text-sm yg-text-ink-1000 outline-none placeholder:yg-text-ink-400 disabled:opacity-60"
                placeholder="금액 입력"
              />
            </div>
            <div className="mt-2 flex gap-2">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setAmount(String(preset))
                    if (betState === "confirming") setBetState("idle")
                  }}
                  disabled={isDisabled}
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs transition-colors",
                    amount === String(preset)
                      ? "yg-bg-primary-500 text-white"
                      : "yg-bg-canvas-100 yg-text-ink-400 hover:yg-bg-canvas-50",
                    isDisabled && "opacity-60"
                  )}
                >
                  {formatPresetAmount(preset)}
                </button>
              ))}
            </div>
          </div>

          {numericAmount > 0 && betState === "idle" && selectedOption && (
            <div className="mb-3 flex items-center justify-between rounded-md px-3 py-2 yg-bg-canvas-50">
              <span className="text-xs yg-text-ink-400">예상 수익</span>
              <span className="text-sm font-medium yg-text-ink-800">
                {formatCurrency(expectedProfit)}
              </span>
            </div>
          )}

          <div className="flex gap-2">
            {betState === "confirming" && (
              <button
                onClick={handleCancel}
                className="rounded-lg px-4 py-2.5 text-sm font-medium yg-bg-canvas-100 yg-text-ink-600 transition-colors hover:yg-bg-canvas-50"
              >
                취소
              </button>
            )}

            <button
              onClick={handleBetClick}
              disabled={numericAmount <= 0 || isDisabled}
              className={cn(
                "flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                betState === "submitting"
                  ? "yg-bg-canvas-100 yg-text-ink-400 cursor-wait"
                  : numericAmount <= 0
                    ? "cursor-not-allowed yg-bg-canvas-100 yg-text-ink-400"
                    : "yg-bg-primary-500 text-white hover:yg-bg-primary-600"
              )}
            >
              {betState === "submitting" ? (
                <>
                  <Spinner />
                  처리 중...
                </>
              ) : betState === "confirming" && selectedOption ? (
                `${formatCurrency(numericAmount)} ${selectedOption.label} 확정하기`
              ) : (
                "선택지에 베팅하기"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
