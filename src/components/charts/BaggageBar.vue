<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseChart from './BaseChart.vue'
import type { BaggageSummary } from '@/types'

const props = defineProps<{ data: BaggageSummary | null; loading?: boolean }>()

const option = computed<EChartsOption>(() => {
  const hourly = props.data?.hourly ?? []
  return {
    grid: { top: 30, left: 40, right: 16, bottom: 28 },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['已分拣', '异常'], textStyle: { color: '#cfe3ff' }, right: 8, top: 0 },
    xAxis: {
      type: 'category',
      data: hourly.map((p) => p.hour),
      axisLine: { lineStyle: { color: '#1b3a6b' } },
      axisLabel: { color: '#6f8bb5' }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(27,58,107,0.4)' } },
      axisLabel: { color: '#6f8bb5' }
    },
    series: [
      {
        name: '已分拣',
        type: 'bar',
        barWidth: '45%',
        itemStyle: { color: '#1890ff', borderRadius: [3, 3, 0, 0] },
        data: hourly.map((p) => p.sorted)
      },
      {
        name: '异常',
        type: 'bar',
        barWidth: '45%',
        itemStyle: { color: '#ff4d4f', borderRadius: [3, 3, 0, 0] },
        data: hourly.map((p) => p.abnormal)
      }
    ]
  }
})
</script>

<template>
  <BaseChart :option="option" :loading="loading" />
</template>
