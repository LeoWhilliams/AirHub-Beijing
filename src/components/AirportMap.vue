<script setup lang="ts">
defineProps<{ pressure?: number }>()
</script>

<template>
  <div class="airport-map">
    <svg viewBox="0 0 400 300" class="map-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="radar" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(54,207,201,0.35)" />
          <stop offset="100%" stop-color="rgba(54,207,201,0)" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="150" r="130" fill="none" stroke="#1b3a6b" />
      <circle cx="200" cy="150" r="90" fill="none" stroke="#1b3a6b" />
      <circle cx="200" cy="150" r="50" fill="url(#radar)" />
      <line x1="70" y1="150" x2="330" y2="150" stroke="#1b3a6b" stroke-dasharray="4 6" />
      <line x1="200" y1="20" x2="200" y2="280" stroke="#1b3a6b" stroke-dasharray="4 6" />
      <g class="runways">
        <rect x="120" y="138" width="160" height="10" rx="5" fill="rgba(24,144,255,0.25)" />
        <rect x="140" y="170" width="120" height="8" rx="4" fill="rgba(54,207,201,0.25)" />
      </g>
      <g class="sweep">
        <path d="M200 150 L200 20 A130 130 0 0 1 320 110 Z" fill="rgba(54,207,201,0.18)" />
      </g>
      <circle class="blip b1" cx="150" cy="110" r="4" fill="#36cfc9" />
      <circle class="blip b2" cx="260" cy="190" r="4" fill="#1890ff" />
      <circle class="blip b3" cx="230" cy="90" r="4" fill="#faad14" />
    </svg>
    <div class="map-tip">实时航线态势 · 在港航班 {{ (pressure ?? 0) > 80 ? '密集' : '平稳' }}</div>
  </div>
</template>

<style scoped lang="scss">
.airport-map {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.map-svg {
  width: 100%;
  height: 100%;
}

.sweep {
  transform-origin: 200px 150px;
  animation: sweep 4s linear infinite;
}

@keyframes sweep {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.blip {
  animation: ah-pulse 1.4s infinite;
}

.b2 {
  animation-delay: 0.4s;
}

.b3 {
  animation-delay: 0.8s;
}

.map-tip {
  margin-top: 6px;
  font-size: 12px;
  color: $color-text-dim;
  letter-spacing: 1px;
}
</style>
