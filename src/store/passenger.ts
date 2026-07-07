import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PassengerSummary } from '@/types'
import { getPassengers } from '@/services/dataService'
import { logger } from '@/utils/logger'

export const usePassengerStore = defineStore('passenger', () => {
  const data = ref<PassengerSummary | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      data.value = await getPassengers()
      logger.info('store:passenger', 'passengers updated', data.value?.totalThroughput)
    } catch (e) {
      error.value = (e as Error).message
      logger.error('store:passenger', 'fetch failed', error.value)
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetch }
})
