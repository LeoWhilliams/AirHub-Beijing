import { describe, expect, it } from 'vitest'
import { computeScale } from '@/composables/useScreenScale'

describe('useScreenScale / computeScale', () => {
  it('设计基准分辨率缩放为 1', () => {
    expect(computeScale(1920, 1080)).toBe(1)
  })

  it('更大分辨率等比放大', () => {
    expect(computeScale(3840, 2160)).toBe(2)
  })

  it('更小分辨率等比缩小', () => {
    expect(computeScale(960, 540)).toBeCloseTo(0.5)
  })

  it('非 16:9 时取较小比例，保持不变形', () => {
    expect(computeScale(1920, 540)).toBeCloseTo(0.5)
    expect(computeScale(960, 1080)).toBeCloseTo(0.5)
  })
})
