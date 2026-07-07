import request from './request'
import type { SecuritySummary } from '@/types'

export function fetchSecurity(): Promise<SecuritySummary> {
  return request.get('/security/summary')
}
