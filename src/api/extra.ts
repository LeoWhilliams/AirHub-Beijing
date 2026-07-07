import request from './request'
import type { ExtraSummary } from '@/types'

export function fetchExtras(): Promise<ExtraSummary> {
  return request.get('/extra/summary')
}
