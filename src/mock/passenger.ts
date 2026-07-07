import type { PassengerSummary } from '@/types'
import { delay, jitter } from './util'

export function getPassengers(): Promise<PassengerSummary> {
  const base = [
    { name: 'T1 航站楼', value: 4200 },
    { name: 'T2 航站楼', value: 3600 },
    { name: 'T3 航站楼', value: 5100 },
    { name: '贵宾厅', value: 800 },
    { name: '中转区', value: 1500 }
  ]
  const summary: PassengerSummary = {
    totalThroughput: base.reduce((s, r) => s + r.value, 0),
    regions: base.map((r) => ({ name: r.name, value: jitter(r.value) }))
  }
  return delay(summary)
}
