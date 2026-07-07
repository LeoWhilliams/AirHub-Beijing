import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { DashboardEvent } from '@/types'
import { getEvents } from '@/services/dataService'

export const useEventStore = defineStore('event', () => {
  const list = ref<DashboardEvent[]>([])
  const loading = ref(false)

  async function fetch() {
    loading.value = true
    try {
      list.value = await getEvents()
    } finally {
      loading.value = false
    }
  }

  return { list, loading, fetch }
})
