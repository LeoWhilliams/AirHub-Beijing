import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BaggageSummary } from '@/types'
import { getBaggage } from '@/services/dataService'
import { logger } from '@/utils/logger'

export const useBaggageStore = defineStore('baggage', () => {
  const data = ref<BaggageSummary | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      data.value = await getBaggage()
      logger.info('store:baggage', 'baggage updated', data.value?.totalHandled)
    } catch (e) {
      error.value = (e as Error).message
      logger.error('store:baggage', 'fetch failed', error.value)
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetch }
})
