<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Decoration5, Decoration6 } from '@kjgl77/datav-vue3'
import { dataSourceMode } from '@/services/dataService'

const now = ref('')
let timer: ReturnType<typeof setInterval> | null = null

function tick() {
  now.value = new Date().toLocaleString('zh-CN', { hour12: false })
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <header class="screen-header">
    <Decoration6 class="deco-left" :color="['#36cfc9', '#1890ff']" />
    <div class="title-wrap">
      <h1 class="title">京翼机场中枢</h1>
      <span class="subtitle">AirHub-Beijing · 机场运行数据中心</span>
    </div>
    <Decoration5 class="deco-right" :color="['#36cfc9', '#1890ff']" :dur="3" />
    <div class="meta">
      <span class="clock">{{ now }}</span>
      <span class="status">
        <i class="led" /> 系统运行正常 · 数据源 {{ dataSourceMode === 'mock' ? 'MOCK' : 'API' }}
      </span>
    </div>
  </header>
</template>

<style scoped lang="scss">
.screen-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88px;
  background: linear-gradient(180deg, rgba(24, 144, 255, 0.18), transparent);
}

.deco-left {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  width: 220px;
  height: 28px;
}

.deco-right {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  width: 220px;
  height: 28px;
}

.title-wrap {
  text-align: center;
}

.title {
  font-size: 34px;
  font-weight: 800;
  letter-spacing: 6px;
  background: linear-gradient(90deg, #36cfc9, #1890ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 18px rgba(54, 207, 201, 0.35);
}

.subtitle {
  font-size: 13px;
  color: $color-text-dim;
  letter-spacing: 2px;
}

.meta {
  position: absolute;
  right: 280px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  font-size: 13px;
  color: $color-text;
}

.status {
  display: flex;
  align-items: center;
  gap: 6px;
  color: $color-text-dim;
}

.led {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #52c41a;
  box-shadow: 0 0 8px #52c41a;
  animation: ah-pulse 1.6s infinite;
}
</style>
