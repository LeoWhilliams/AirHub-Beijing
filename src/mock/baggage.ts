import type { BaggageSummary } from '@/types'
import { delay, jitter } from './util'

const HOURS = Array.from({ length: 12 }, (_, i) => `${String(i * 2).padStart(2, '0')}:00`)

export function getBaggage(): Promise<BaggageSummary> {
  const hourly = HOURS.map((hour) => ({
    hour,
    sorted: jitter(1200 + Math.floor(Math.random() * 400)),
    abnormal: jitter(8 + Math.floor(Math.random() * 14))
  }))
  const summary: BaggageSummary = {
    totalHandled: hourly.reduce((s, p) => s + p.sorted, 0),
    hourly
  }
  return delay(summary)
}
