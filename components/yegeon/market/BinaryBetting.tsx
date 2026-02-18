"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import {
  formatCurrency,
  calculateExpectedProfit,
  formatPresetAmount,
} from "@/lib/yegeon-utils"
import { Spinner, CheckCircleIcon } from "../common/BettingIcons"

type BetState = "idle" | "confirming" | "submitting" | "success"

const SUCCESS_RESET_MS = 3000
const MIN_SUBMIT_DELAY_MS = 1000
const SUBMIT_JITTER_MS = 500
const PRESET_AMOUNTS = [1000, 5000, 10000, 50000]

interface BinaryBettingProps {
  probability: number
}

export default function BinaryBetting({ probability }: BinaryBettingProps) {
  const [amount, setAmount] = useState<string>("1000")
  const [selectedSide, setSelectedSide] = useState<"YES" | "NO" | null>(null)
  const [betState, setBetState] = useState<BetState>("idle")

  const yesPercent = Math.round(probability * 100)
  const noPercent = 100 - yesPercent

  const numericAmount = Number(amount) || 0
  const selectedProbability =
    selectedSide === "YES" ? probability : 1 - probability
  const expectedProfit = calculateExpectedProfit(
    numericAmount,
    selectedProbability
  )

  const resetBet = useCallback(() => {
    setBetState("idle")
    setSelectedSide(null)
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

  if (betState === "success") {
    return (
      <div className="rounded-lg border yg-border-canvas-100 yg-bg-canvas-50/50 p-4">
        <div className="flex flex-col items-center gap-3 py-6">
          <div
            className={cn(
              selectedSide === "YES" ? "yg-text-yes-500" : "yg-text-no-500"
            )}
          >
            <CheckCircleIcon />
          </div>
          <span className="text-lg font-bold yg-text-ink-900 animate-bet-fade">
            베팅 완료!
          </span>
          <div
            className="flex flex-col items-center gap-1 animate-bet-fade"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-sm yg-text-ink-600">
              {selectedSide} {formatCurrency(numericAmount)}
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
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium yg-text-ink-600">현재 확률</span>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold yg-text-yes-500">
            {yesPercent}%
          </span>
          <span className="text-sm yg-text-ink-400">YES</span>
        </div>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full yg-bg-canvas-100">
        <div
          className="h-full rounded-full yg-gradient-yes transition-all duration-500"
          style={{ width: `${yesPercent}%` }}
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            if (!isDisabled) {
              setSelectedSide("YES")
              if (betState === "confirming") setBetState("idle")
            }
          }}
          disabled={isDisabled}
          className={cn(
            "yegeon-bet-btn flex flex-col items-center gap-1 rounded-lg border-2 px-4 py-3 font-medium transition-all",
            selectedSide === "YES"
              ? "yg-border-yes-500 yg-bg-yes-600/20 yg-text-yes-500"
              : "yg-border-canvas-100 yg-bg-canvas-50 yg-text-ink-600 hover:yg-border-yes-600 hover:yg-bg-yes-100/10",
            isDisabled && "opacity-60"
          )}
        >
          <span className="text-lg font-bold">YES</span>
          <span className="text-xs opacity-70">{yesPercent}%에 매수</span>
        </button>

        <button
          onClick={() => {
            if (!isDisabled) {
              setSelectedSide("NO")
              if (betState === "confirming") setBetState("idle")
            }
          }}
          disabled={isDisabled}
          className={cn(
            "yegeon-bet-btn flex flex-col items-center gap-1 rounded-lg border-2 px-4 py-3 font-medium transition-all",
            selectedSide === "NO"
              ? "yg-border-no-500 yg-bg-no-600/20 yg-text-no-500"
              : "yg-border-canvas-100 yg-bg-canvas-50 yg-text-ink-600 hover:yg-border-no-600 hover:yg-bg-no-100/10",
            isDisabled && "opacity-60"
          )}
        >
          <span className="text-lg font-bold">NO</span>
          <span className="text-xs opacity-70">{noPercent}%에 매수</span>
        </button>
      </div>

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

      {selectedSide && numericAmount > 0 && betState === "idle" && (
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
          disabled={!selectedSide || numericAmount <= 0 || isDisabled}
          className={cn(
            "flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2",
            betState === "submitting"
              ? "yg-bg-canvas-100 yg-text-ink-400 cursor-wait"
              : selectedSide === "YES"
                ? "yg-bg-yes-600 text-white hover:yg-bg-yes-500"
                : selectedSide === "NO"
                  ? "yg-bg-no-500 text-white hover:yg-bg-no-600"
                  : "cursor-not-allowed yg-bg-canvas-100 yg-text-ink-400"
          )}
        >
          {betState === "submitting" ? (
            <>
              <Spinner />
              처리 중...
            </>
          ) : betState === "confirming" ? (
            `${formatCurrency(numericAmount)} ${selectedSide} 확정하기`
          ) : selectedSide ? (
            `${selectedSide} ${numericAmount > 0 ? formatCurrency(numericAmount) : ""} 베팅하기`
          ) : (
            "방향을 선택하세요"
          )}
        </button>
      </div>
    </div>
  )
}
