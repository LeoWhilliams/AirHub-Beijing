<script setup lang="ts">
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

use([CanvasRenderer])

defineProps<{
  option: EChartsOption
  loading?: boolean
}>()

const darkLoading = {
  text: '数据加载中',
  color: '#36cfc9',
  textColor: '#cfe3ff',
  maskColor: 'rgba(6, 16, 36, 0.55)',
  fontSize: 14,
  zlevel: 0
}
</script>

<template>
  <v-chart
    class="base-chart"
    :option="option"
    :autoresize="true"
    :loading="loading"
    :loading-options="darkLoading"
  />
</template>

<style scoped lang="scss">
.base-chart {
  width: 100%;
  height: 100%;
}
</style>
