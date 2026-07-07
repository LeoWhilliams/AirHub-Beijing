import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ExtraSummary } from '@/types'
import { getExtras } from '@/services/dataService'
import { logger } from '@/utils/logger'

export const useExtraStore = defineStore('extra', () => {
  const data = ref<ExtraSummary | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      data.value = await getExtras()
      logger.info('store:extra', 'extras updated', data.value?.gates.length)
    } catch (e) {
      error.value = (e as Error).message
      logger.error('store:extra', 'fetch failed', error.value)
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetch }
})
