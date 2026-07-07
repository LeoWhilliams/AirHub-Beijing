<script setup lang="ts">
import type { GateItem } from '@/types'

defineProps<{ gates: GateItem[] }>()

function pct(g: GateItem): number {
  if (g.total <= 0) return 0
  return Math.min(100, Math.round((g.used / g.total) * 100))
}

function color(g: GateItem): string {
  const p = pct(g)
  if (p >= 85) return '#ff4d4f'
  if (p >= 65) return '#faad14'
  return '#36cfc9'
}
</script>

<template>
  <div class="gate-list">
    <div v-for="g in gates" :key="g.name" class="gate-row">
      <span class="gate-name">{{ g.name }}</span>
      <div class="bar">
        <div class="bar-fill" :style="{ width: pct(g) + '%', background: color(g) }" />
      </div>
      <span class="gate-val">{{ g.used }}/{{ g.total }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gate-list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  gap: 4px;
}

.gate-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.gate-name {
  width: 84px;
  color: $color-text;
  flex: none;
}

.bar {
  flex: 1;
  height: 8px;
  background: rgba(27, 58, 107, 0.5);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
  box-shadow: 0 0 6px currentColor;
}

.gate-val {
  width: 48px;
  text-align: right;
  color: $color-text-dim;
  font-variant-numeric: tabular-nums;
  flex: none;
}
</style>
