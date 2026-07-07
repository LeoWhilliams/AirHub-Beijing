import type { SecuritySummary } from '@/types'
import { delay, jitter } from './util'

export function getSecurity(): Promise<SecuritySummary> {
  const lanesTotal = 24
  const summary: SecuritySummary = {
    pressure: jitter(62, 0.12),
    lanesOpen: jitter(18, 0.1),
    lanesTotal,
    avgWaitSeconds: jitter(180, 0.15)
  }
  return delay(summary)
}
