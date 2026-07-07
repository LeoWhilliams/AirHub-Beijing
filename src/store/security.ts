import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SecuritySummary } from '@/types'
import { getSecurity } from '@/services/dataService'
import { logger } from '@/utils/logger'

export const useSecurityStore = defineStore('security', () => {
  const data = ref<SecuritySummary | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch() {
    loading.value = true
    error.value = null
    try {
      data.value = await getSecurity()
      logger.info('store:security', 'security updated', data.value?.pressure)
    } catch (e) {
      error.value = (e as Error).message
      logger.error('store:security', 'fetch failed', error.value)
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetch }
})
