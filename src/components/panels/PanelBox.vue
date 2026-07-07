<script setup lang="ts">
import { BorderBox1 } from '@kjgl77/datav-vue3'

defineProps<{ title?: string }>()
</script>

<template>
  <div class="panel">
    <BorderBox1 :color="['#1b3a6b', '#36cfc9']" :background-color="`rgba(13,32,64,0.35)`">
      <div class="panel-inner">
        <div v-if="title" class="panel-title">
          <span class="dot" />
          {{ title }}
        </div>
        <div class="panel-body" :class="{ 'has-title': title }">
          <slot />
        </div>
      </div>
    </BorderBox1>
  </div>
</template>

<style scoped lang="scss">
.panel {
  position: relative;
  width: 100%;
  height: 100%;
}

.panel-inner {
  position: absolute;
  inset: 0;
  padding: 10px 14px 14px;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: $color-text;
  letter-spacing: 1px;
}

.panel-title .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $color-primary;
  box-shadow: 0 0 8px $color-primary;
  animation: ah-pulse 1.8s infinite;
}

.panel-body {
  position: absolute;
  inset: 10px 14px 14px;

  &.has-title {
    top: 42px;
  }
}
</style>
