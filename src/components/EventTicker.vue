<script setup lang="ts">
import type { DashboardEvent } from '@/types'

defineProps<{ items: DashboardEvent[] }>()

const LEVEL_COLOR: Record<DashboardEvent['level'], string> = {
  info: '#36cfc9',
  warning: '#faad14',
  error: '#ff4d4f'
}
</script>

<template>
  <div class="ticker">
    <div class="track">
      <div v-for="(ev, i) in items" :key="ev.id + '-a' + i" class="row">
        <span class="time">{{ ev.time }}</span>
        <span class="badge" :style="{ background: LEVEL_COLOR[ev.level] }" />
        <span class="msg">{{ ev.message }}</span>
      </div>
      <div v-for="(ev, i) in items" :key="ev.id + '-b' + i" class="row" aria-hidden="true">
        <span class="time">{{ ev.time }}</span>
        <span class="badge" :style="{ background: LEVEL_COLOR[ev.level] }" />
        <span class="msg">{{ ev.message }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ticker {
  height: 100%;
  overflow: hidden;
}

.track {
  display: flex;
  flex-direction: column;
  gap: 8px;
  animation: scroll-up 16s linear infinite;
}

.row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: $color-text;
}

.time {
  color: $color-text-dim;
  font-variant-numeric: tabular-nums;
}

.badge {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex: none;
}

.msg {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@keyframes scroll-up {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}
</style>
