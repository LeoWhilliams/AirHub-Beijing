<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseChart from './BaseChart.vue'
import type { PassengerSummary } from '@/types'

const props = defineProps<{ data: PassengerSummary | null; loading?: boolean }>()

const PALETTE = ['#36cfc9', '#1890ff', '#722ed1', '#faad14', '#52c41a']

const option = computed<EChartsOption>(() => {
  const regions = props.data?.regions ?? []
  return {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: {
      orient: 'vertical',
      right: 8,
      top: 'center',
      textStyle: { color: '#cfe3ff' }
    },
    series: [
      {
        name: '客流区域',
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['38%', '52%'],
        itemStyle: { borderColor: '#061024', borderWidth: 2 },
        label: { color: '#cfe3ff' },
        data: regions.map((r, i) => ({
          name: r.name,
          value: r.value,
          itemStyle: { color: PALETTE[i % PALETTE.length] }
        }))
      }
    ]
  }
})
</script>

<template>
  <BaseChart :option="option" :loading="loading" />
</template>
