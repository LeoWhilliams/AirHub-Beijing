<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseChart from './BaseChart.vue'
import type { SecuritySummary } from '@/types'

const props = defineProps<{ data: SecuritySummary | null; loading?: boolean }>()

const option = computed<EChartsOption>(() => {
  const value = props.data?.pressure ?? 0
  return {
    series: [
      {
        type: 'gauge',
        startAngle: 210,
        endAngle: -30,
        min: 0,
        max: 100,
        radius: '92%',
        progress: { show: true, width: 14 },
        axisLine: {
          lineStyle: {
            width: 14,
            color: [
              [0.6, '#52c41a'],
              [0.85, '#faad14'],
              [1, '#ff4d4f']
            ]
          }
        },
        pointer: { width: 4 },
        axisTick: { show: false },
        splitLine: { length: 10, lineStyle: { color: '#1b3a6b' } },
        axisLabel: { color: '#6f8bb5', distance: 16 },
        anchor: { show: true, size: 10, itemStyle: { color: '#36cfc9' } },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: '#cfe3ff',
          fontSize: 26,
          offsetCenter: [0, '58%']
        },
        title: { show: false },
        data: [{ value }]
      }
    ]
  }
})
</script>

<template>
  <BaseChart :option="option" :loading="loading" />
</template>
