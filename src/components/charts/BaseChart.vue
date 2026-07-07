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
</script>

<template>
  <v-chart class="base-chart" :option="option" :autoresize="true" :loading="loading" />
</template>

<style scoped lang="scss">
.base-chart {
  width: 100%;
  height: 100%;
}
</style>
