<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div class="panel">
    <span class="corner tl" />
    <span class="corner tr" />
    <span class="corner bl" />
    <span class="corner br" />
    <div class="panel-border-base" />
    <div class="panel-inner">
      <div v-if="title" class="panel-title">
        <span class="dot" />
        {{ title }}
      </div>
      <div class="panel-body" :class="{ 'has-title': title }">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.panel {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: $radius;
  background: $color-panel;
  overflow: hidden;
}

/* 四角静态小灯（不闪烁） */
.corner {
  position: absolute;
  width: 14px;
  height: 14px;
  z-index: 2;
  filter: drop-shadow(0 0 4px #36cfc9);
}

.corner.tl {
  top: 4px;
  left: 4px;
  border-top: 2px solid #36cfc9;
  border-left: 2px solid #36cfc9;
}

.corner.tr {
  top: 4px;
  right: 4px;
  border-top: 2px solid #36cfc9;
  border-right: 2px solid #36cfc9;
}

.corner.bl {
  bottom: 4px;
  left: 4px;
  border-bottom: 2px solid #36cfc9;
  border-left: 2px solid #36cfc9;
}

.corner.br {
  bottom: 4px;
  right: 4px;
  border-bottom: 2px solid #36cfc9;
  border-right: 2px solid #36cfc9;
}

/* 极淡的轮廓线，保持模块形状 */
.panel-border-base {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(24, 144, 255, 0.18);
  border-radius: $radius;
  pointer-events: none;
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
}

.panel-body {
  position: absolute;
  inset: 10px 14px 14px;

  &.has-title {
    top: 42px;
  }
}
</style>
