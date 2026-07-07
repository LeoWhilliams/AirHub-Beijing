import { describe, expect, it } from 'vitest'
import { getBaggage, getFlights, getPassengers, getSecurity, dataSourceMode } from '@/services/dataService'

describe('dataService (mock mode)', () => {
  it('数据源模式应为 mock', () => {
    expect(dataSourceMode).toBe('mock')
  })

  it('getFlights 返回结构正确的航班数据', async () => {
    const data = await getFlights()
    expect(typeof data.totalToday).toBe('number')
    expect(Array.isArray(data.trend)).toBe(true)
    expect(data.trend[0]).toHaveProperty('takeoff')
    expect(data.trend[0]).toHaveProperty('landing')
  })

  it('getPassengers 返回区域占比', async () => {
    const data = await getPassengers()
    expect(typeof data.totalThroughput).toBe('number')
    expect(data.regions.length).toBeGreaterThan(0)
  })

  it('getBaggage 返回小时维度分拣量', async () => {
    const data = await getBaggage()
    expect(Array.isArray(data.hourly)).toBe(true)
    expect(data.hourly[0]).toHaveProperty('sorted')
  })

  it('getSecurity 返回安检压力', async () => {
    const data = await getSecurity()
    expect(data.pressure).toBeGreaterThanOrEqual(0)
    expect(data.pressure).toBeLessThanOrEqual(100)
  })
})
