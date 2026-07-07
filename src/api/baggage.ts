import request from './request'
import type { BaggageSummary } from '@/types'

export function fetchBaggage(): Promise<BaggageSummary> {
  return request.get('/baggage/summary')
}
