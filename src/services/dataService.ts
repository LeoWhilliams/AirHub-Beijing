import type {
  BaggageSummary,
  DashboardEvent,
  ExtraSummary,
  FlightSummary,
  PassengerSummary,
  SecuritySummary
} from '@/types'
import * as mock from '@/mock'
import { fetchFlights } from '@/api/flight'
import { fetchPassengers } from '@/api/passenger'
import { fetchBaggage } from '@/api/baggage'
import { fetchSecurity } from '@/api/security'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

/**
 * 根据 VITE_USE_MOCK 选择数据源。业务组件只依赖本服务，切换时零改动。
 */
function pickSource<T>(apiFn: () => Promise<T>, mockFn: () => Promise<T>): Promise<T> {
  return USE_MOCK ? mockFn() : apiFn()
}

export function getFlights(): Promise<FlightSummary> {
  return pickSource(fetchFlights, mock.getFlights)
}

export function getPassengers(): Promise<PassengerSummary> {
  return pickSource(fetchPassengers, mock.getPassengers)
}

export function getBaggage(): Promise<BaggageSummary> {
  return pickSource(fetchBaggage, mock.getBaggage)
}

export function getSecurity(): Promise<SecuritySummary> {
  return pickSource(fetchSecurity, mock.getSecurity)
}

export function getEvents(): Promise<DashboardEvent[]> {
  return mock.getEvents()
}

export function getExtras(): Promise<ExtraSummary> {
  return pickSource(
    async () =>
      (await import('@/api/extra')).fetchExtras(),
    mock.getExtras
  )
}

export const dataSourceMode = USE_MOCK ? 'mock' : 'api'
