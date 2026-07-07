<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseChart from './charts/BaseChart.vue'
import type { RankItem } from '@/types'

const props = defineProps<{ ranks: RankItem[]; loading?: boolean }>()

const option = computed<EChartsOption>(() => {
  // 升序排列：最低在底部、最高在顶部，标题“TOP”即榜首在顶部
  const sorted = [...(props.ranks ?? [])].sort((a, b) => a.rate - b.rate)
  // 文本（左侧）与柱状图（右侧）一一对应，并标注名次
  const labels = sorted.map((r, i) => `${sorted.length - i}. ${r.name}`)
  const values = sorted.map((r) => r.rate)
  return {
    grid: { top: 8, left: 72, right: 44, bottom: 8 },
    xAxis: { type: 'value', max: 100, show: false },
    yAxis: {
      type: 'category',
      data: labels,
      axisLine: { lineStyle: { color: '#1b3a6b' } },
      axisTick: { show: false },
      axisLabel: { color: '#cfe3ff', interval: 0 }
    },
    series: [
      {
        type: 'bar',
        data: values,
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
