<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseChart from './BaseChart.vue'
import type { FlightSummary } from '@/types'

const props = defineProps<{ data: FlightSummary | null; loading?: boolean }>()

const option = computed<EChartsOption>(() => {
  const trend = props.data?.trend ?? []
  return {
    grid: { top: 30, left: 40, right: 16, bottom: 28 },
    tooltip: { trigger: 'axis' },
    legend: { data: ['起飞', '降落'], textStyle: { color: '#cfe3ff' }, right: 8, top: 0 },
    xAxis: {
      type: 'category',
      data: trend.map((p) => p.time),
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
        name: '起飞',
        type: 'line',
        smooth: true,
        areaStyle: { color: 'rgba(54,207,201,0.25)' },
        itemStyle: { color: '#36cfc9' },
        data: trend.map((p) => p.takeoff)
      },
      {
        name: '降落',
        type: 'line',
        smooth: true,
        areaStyle: { color: 'rgba(24,144,255,0.2)' },
        itemStyle: { color: '#1890ff' },
        data: trend.map((p) => p.landing)
      }
    ]
  }
})
</script>

<template>
  <BaseChart :option="option" :loading="loading" />
</template>
