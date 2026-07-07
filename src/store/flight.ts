import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FlightSummary } from '@/types'
import { getFlights } from '@/services/dataService'
import { logger } from '@/utils/logger'

export const useFlightStore = defineStore('flight', () => {
  const data = ref<FlightSummary | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      data.value = await getFlights()
      logger.info('store:flight', 'flights updated', data.value?.totalToday)
    } catch (e) {
      error.value = (e as Error).message
      logger.error('store:flight', 'fetch failed', error.value)
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetch }
})
