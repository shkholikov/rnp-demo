"use client"

import { useEffect, useState } from "react"

type Format = "currency" | "number" | "percent" | "decimal"

function easeOutQuart(t: number): number {
  return 1 - (1 - t) ** 4
}

function formatValue(value: number, format: Format): string {
  switch (format) {
    case "currency":
      return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    case "number":
      return Math.round(value).toLocaleString()
    case "percent":
      return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`
    case "decimal":
      return value.toFixed(1)
    default:
      return String(value)
  }
}

export function useCountUp(
  end: number,
  options: {
    duration?: number
    delay?: number
    format?: Format
    start?: number
  } = {}
) {
  const {
    duration = 1200,
    delay = 0,
    format = "number",
    start = 0,
  } = options

  const [display, setDisplay] = useState(formatValue(start, format))

  useEffect(() => {
    if (end === start) {
      setDisplay(formatValue(end, format))
      return
    }

    let startTime: number
    let rafId: number

    const run = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime - delay
      if (elapsed < 0) {
        rafId = requestAnimationFrame(run)
        return
      }
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutQuart(progress)
      const current = start + (end - start) * eased
      setDisplay(formatValue(current, format))
      if (progress < 1) {
        rafId = requestAnimationFrame(run)
      }
    }

    const timeoutId = window.setTimeout(() => {
      rafId = requestAnimationFrame(run)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(rafId)
    }
  }, [end, start, duration, delay, format])

  return display
}
