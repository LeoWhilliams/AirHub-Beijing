<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseChart from './charts/BaseChart.vue'
import type { RankItem } from '@/types'

const props = defineProps<{ ranks: RankItem[]; loading?: boolean }>()

const option = computed<EChartsOption>(() => {
  const sorted = [...(props.ranks ?? [])].sort((a, b) => a.rate - b.rate)
  return {
    grid: { top: 8, left: 56, right: 44, bottom: 8 },
    xAxis: { type: 'value', max: 100, show: false },
    yAxis: {
      type: 'category',
      data: sorted.map((r) => r.name),
      axisLine: { lineStyle: { color: '#1b3a6b' } },
      axisTick: { show: false },
      axisLabel: { color: '#cfe3ff' }
    },
    series: [
      {
        type: 'bar',
        data: sorted.map((r) => r.rate),
        barWidth: '55%',
        itemStyle: {
          borderRadius: [0, 4, 4, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#1890ff' },
              { offset: 1, color: '#36cfc9' }
            ]
          }
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          color: '#cfe3ff'
        }
      }
    ]
  }
})
</script>

<template>
  <BaseChart :option="option" :loading="loading" />
</template>
