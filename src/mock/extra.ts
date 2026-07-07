import type { ExtraSummary } from '@/types'
import { delay, jitter } from './util'

const GATES = [
  { name: 'T1 登机口', total: 48 },
  { name: 'T2 登机口', total: 42 },
  { name: 'T3 登机口', total: 60 },
  { name: '跑道 A', total: 2 },
  { name: '跑道 B', total: 2 },
  { name: '行李转盘', total: 18 }
]

const AIRLINES = ['国航', '东航', '南航', '海航', '厦航', '深航']

export function getExtras(): Promise<ExtraSummary> {
  const gates = GATES.map((g) => ({
    name: g.name,
    total: g.total,
    used: Math.max(0, jitter(Math.round(g.total * 0.62), 0.25))
  }))
  const ranks = AIRLINES.map((name) => ({
    name,
    rate: Number((0.82 + Math.random() * 0.16).toFixed(3))
  }))
    .sort((a, b) => b.rate - a.rate)
    .map((r) => ({ ...r, rate: Math.round(r.rate * 100) }))
  return delay({ gates, ranks })
}
