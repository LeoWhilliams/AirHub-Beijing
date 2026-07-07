<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <div class="panel">
    <span class="corner tl" />
    <span class="corner tr" />
    <span class="corner bl" />
    <span class="corner br" />
    <div class="panel-inner">
      <div v-if="title" class="panel-title">
        <span class="title-text">{{ title }}</span>
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
  border: 1px solid transparent;
  border-radius: 2px;
  background: $color-panel;
  /* 科技感渐变静态边框 */
  border-image: linear-gradient(
      135deg,
      rgba(54, 207, 201, 0.65),
      rgba(24, 144, 255, 0.12) 45%,
      rgba(24, 144, 255, 0.12) 55%,
      rgba(54, 207, 201, 0.65)
    )
    1;
  overflow: hidden;
}

/* 四角静态小灯/折线 */
.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  z-index: 2;
  pointer-events: none;
  filter: drop-shadow(0 0 4px #36cfc9);
}

.corner.tl {
  top: 3px;
  left: 3px;
  border-top: 2px solid #36cfc9;
  border-left: 2px solid #36cfc9;
}

.corner.tr {
  top: 3px;
  right: 3px;
  border-top: 2px solid #36cfc9;
  border-right: 2px solid #36cfc9;
}

.corner.bl {
  bottom: 3px;
  left: 3px;
  border-bottom: 2px solid #36cfc9;
  border-left: 2px solid #36cfc9;
}

.corner.br {
  bottom: 3px;
  right: 3px;
  border-bottom: 2px solid #36cfc9;
  border-right: 2px solid #36cfc9;
}

.panel-inner {
  position: absolute;
  inset: 0;
  padding: 10px 14px 14px;
}

.panel-title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26px;
  font-size: 16px;
  font-weight: 600;
  color: $color-text;
  letter-spacing: 2px;
}

.title-text {
  position: relative;
  padding: 0 16px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 20px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #36cfc9);
  }

  &::before {
    right: 100%;
    transform: scaleX(-1);
  }

  &::after {
    left: 100%;
  }
}

.panel-body {
  position: absolute;
  inset: 10px 14px 14px;

  &.has-title {
    top: 42px;
  }
}
</style>
