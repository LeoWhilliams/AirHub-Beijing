import request from './request'
import type { FlightSummary } from '@/types'

export function fetchFlights(): Promise<FlightSummary> {
  return request.get('/flights/summary')
}
