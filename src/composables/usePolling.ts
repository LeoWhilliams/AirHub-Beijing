import { onBeforeUnmount, onMounted } from 'vue'

/**
 * 定时轮询：立即执行一次 fn，随后每 intervalMs 重复执行。
 * 返回 stop() 用于手动停止。组件卸载时自动停止。
 */
export function usePolling(fn: () => void, intervalMs = 5000) {
  let timer: ReturnType<typeof setInterval> | null = null

  function start() {
    fn()
    timer = setInterval(fn, intervalMs)
  }

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  onMounted(start)
  onBeforeUnmount(stop)

  return { start, stop }
}
