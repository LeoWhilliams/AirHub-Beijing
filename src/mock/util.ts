export function delay<T>(data: T, min = 200, max = 600): Promise<T> {
  const ms = Math.floor(Math.random() * (max - min)) + min
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export function jitter(base: number, percent = 0.08): number {
  const delta = base * percent
  return Math.round(base + (Math.random() * 2 - 1) * delta)
}

export function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
