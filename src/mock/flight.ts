import type { FlightSummary } from '@/types'
import { delay, jitter } from './util'

const HOURS = Array.from({ length: 12 }, (_, i) => `${String(i * 2).padStart(2, '0')}:00`)

export function getFlights(): Promise<FlightSummary> {
  const trend = HOURS.map((time) => ({
    time,
    takeoff: jitter(40 + Math.floor(Math.random() * 20)),
    landing: jitter(38 + Math.floor(Math.random() * 20))
  }))
  const totalToday = trend.reduce((s, p) => s + p.takeoff + p.landing, 0)
  const summary: FlightSummary = {
    totalToday,
    onTimeRate: Number((0.9 + Math.random() * 0.08).toFixed(3)),
    takeoffCount: trend.reduce((s, p) => s + p.takeoff, 0),
    landingCount: trend.reduce((s, p) => s + p.landing, 0),
    trend
  }
  return delay(summary)
}
