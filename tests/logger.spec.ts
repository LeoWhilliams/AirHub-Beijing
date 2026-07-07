import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { logger } from '@/utils/logger'

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'debug').mockImplementation(() => {})
    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('debug 在开发环境输出到 console.debug', () => {
    logger.debug('test', 'hello')
    expect(console.debug).toHaveBeenCalled()
    expect(String(vi.mocked(console.debug).mock.calls[0][0])).toContain('[AirHub]')
  })

  it('info/warn/error 各自写入对应级别', () => {
    logger.info('m', 'i')
    logger.warn('m', 'w')
    logger.error('m', 'e')
    expect(console.info).toHaveBeenCalled()
    expect(console.warn).toHaveBeenCalled()
    expect(console.error).toHaveBeenCalled()
  })
})
