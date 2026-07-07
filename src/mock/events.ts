import type { DashboardEvent } from '@/types'
import { delay, pick } from './util'

const POOL: Omit<DashboardEvent, 'id' | 'time'>[] = [
  { level: 'info', message: 'CA1832 航班已准点离港，前往上海虹桥' },
  { level: 'info', message: 'T3 航站楼新增 2 条安检通道' },
  { level: 'warning', message: 'MU5103 登机口变更至 C12，请旅客注意' },
  { level: 'warning', message: '行李分拣区 B 区负载偏高' },
  { level: 'error', message: 'C05 安检通道设备告警，已切换备用通道' },
  { level: 'info', message: '今日旅客吞吐量突破 15 万人次' },
  { level: 'warning', message: 'T2 值机区排队人数较多' }
]

export function getEvents(): Promise<DashboardEvent[]> {
  const now = new Date()
  const events: DashboardEvent[] = Array.from({ length: 6 }, (_, i) => {
    const item = pick(POOL)
    const t = new Date(now.getTime() - i * 37000)
    return {
      ...item,
      id: `evt-${Date.now()}-${i}`,
      time: t.toLocaleTimeString('zh-CN', { hour12: false })
    }
  })
  return delay(events, 100, 300)
}
