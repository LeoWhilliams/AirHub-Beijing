import { onBeforeUnmount, onMounted, ref } from 'vue'

export const DESIGN_WIDTH = 1920
export const DESIGN_HEIGHT = 1080

export function computeScale(width: number, height: number): number {
  return Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT)
}

/**
 * 大屏等比缩放适配：以 1920×1080 为设计基准，监听 resize，
 * 返回 scale 与居中所需的偏移量，对容器做 transform: scale() 即可不变形。
 */
export function useScreenScale() {
  const scale = ref(1)
  const offsetX = ref(0)
  const offsetY = ref(0)

  function update() {
    const w = window.innerWidth
    const h = window.innerHeight
    scale.value = computeScale(w, h)
    offsetX.value = (w - DESIGN_WIDTH * scale.value) / 2
    offsetY.value = (h - DESIGN_HEIGHT * scale.value) / 2
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })
  onBeforeUnmount(() => window.removeEventListener('resize', update))

  return { scale, offsetX, offsetY, designWidth: DESIGN_WIDTH, designHeight: DESIGN_HEIGHT }
}
