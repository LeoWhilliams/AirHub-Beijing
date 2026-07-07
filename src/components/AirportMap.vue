<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import VChart from 'vue-echarts'
import { registerMap } from 'echarts/core'
import type { EChartsOption } from 'echarts'

const props = defineProps<{ pressure?: number }>()

const CHINA_GEO_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'

// 飞机图标（Material flight，24x24 viewBox），沿航线方向自动旋转
const PLANE_PATH =
  'path://M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'

const mapReady = ref(false)
const loadError = ref(false)

const BEIJING: [number, number] = [116.4, 39.9]
const CITIES: { name: string; coord: [number, number] }[] = [
  { name: '上海', coord: [121.47, 31.23] },
  { name: '广州', coord: [113.26, 23.13] },
  { name: '成都', coord: [104.07, 30.57] },
  { name: '乌鲁木齐', coord: [87.62, 43.82] },
  { name: '哈尔滨', coord: [126.53, 45.8] },
  { name: '昆明', coord: [102.71, 25.04] },
  { name: '拉萨', coord: [91.11, 29.97] },
  { name: '西安', coord: [108.95, 34.27] },
  { name: '武汉', coord: [114.3, 30.59] },
  { name: '沈阳', coord: [123.43, 41.8] },
  { name: '海口', coord: [110.35, 20.02] }
]

const linesData = CITIES.map((c) => ({
  fromName: '北京',
  toName: c.name,
  coords: [BEIJING, c.coord]
}))

const option = computed<EChartsOption>(() => {
  if (loadError.value) {
    return {
      title: {
        text: '航线地图加载失败（需联网获取中国地图）',
        left: 'center',
        top: 'center',
        textStyle: { color: '#ff4d4f', fontSize: 14 }
      }
    }
  }
  if (!mapReady.value) {
    return {
      title: {
        text: '航线地图加载中…',
        left: 'center',
        top: 'center',
        textStyle: { color: '#6f8bb5', fontSize: 14 }
      }
    }
  }
  return {
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.15,
      itemStyle: {
        areaColor: 'rgba(13,32,64,0.55)',
        borderColor: '#1b3a6b',
        borderWidth: 1
      },
      emphasis: {
        itemStyle: { areaColor: '#16335f' },
        label: { show: false }
      },
      label: { show: false }
    },
    series: [
      {
        name: '航线',
        type: 'lines',
        coordinateSystem: 'geo',
        zlevel: 2,
        effect: {
          show: true,
          period: 5,
          trailLength: 0.25,
          symbol: PLANE_PATH,
          symbolSize: 14,
          color: '#36cfc9'
        },
        lineStyle: { color: '#1890ff', width: 1, opacity: 0.5, curveness: 0.25 },
        data: linesData
      },
      {
        name: '目的地',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: { brushType: 'stroke', scale: 3 },
        symbolSize: 5,
        itemStyle: { color: '#36cfc9' },
        data: CITIES.map((c) => ({ name: c.name, value: c.coord }))
      },
      {
        name: '北京',
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: 12,
        itemStyle: { color: '#faad14', shadowBlur: 10, shadowColor: '#faad14' },
        label: {
          show: true,
          formatter: '北京',
          position: 'right',
          color: '#cfe3ff',
          fontSize: 12
        },
        data: [{ name: '北京', value: BEIJING }]
      }
    ]
  }
})

onMounted(async () => {
  try {
    const res = await fetch(CHINA_GEO_URL)
    const geoJson = await res.json()
    registerMap('china', geoJson)
    mapReady.value = true
  } catch (e) {
    loadError.value = true
    // eslint-disable-next-line no-console
    console.error('[AirHub] china map load failed', e)
  }
})
</script>

<template>
  <div class="airport-map">
    <VChart class="map-chart" :option="option" autoresize />
    <div class="map-tip">北京 → 全国航线 · 在港航班 {{ (props.pressure ?? 0) > 80 ? '密集' : '平稳' }}</div>
  </div>
</template>

<style scoped lang="scss">
.airport-map {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.map-chart {
  flex: 1;
  width: 100%;
  min-height: 0;
}

.map-tip {
  text-align: center;
  font-size: 12px;
  color: $color-text-dim;
  letter-spacing: 1px;
  padding-top: 4px;
}
</style>
