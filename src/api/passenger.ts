import request from './request'
import type { PassengerSummary } from '@/types'

export function fetchPassengers(): Promise<PassengerSummary> {
  return request.get('/passengers/summary')
}
