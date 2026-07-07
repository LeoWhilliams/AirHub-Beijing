type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: '#7f8c9b',
  info: '#36cfc9',
  warn: '#faad14',
  error: '#ff4d4f'
}

const PREFIX = '[AirHub]'

function timestamp(): string {
  return new Date().toLocaleTimeString('zh-CN', { hour12: false })
}

/**
 * 上报钩子：生产环境可在此对接 Sentry / 自建日志服务。
 * 例如：Sentry.captureMessage(msg, { level, extra: meta })
 */
function report(level: LogLevel, _msg: string, _meta?: unknown): void {
  if (import.meta.env.PROD && level === 'error') {
    // 预留：window.__LOG_REPORTER__?.({ level, msg: _msg, meta: _meta })
  }
}

function emit(level: LogLevel, module: string, msg: string, meta?: unknown): void {
  const tag = `${PREFIX}::${module}`
  const style = `color:${LEVEL_COLORS[level]};font-weight:600`
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console[level](`%c${tag}%c ${timestamp()} ${msg}`, style, 'color:inherit', meta ?? '')
  } else if (level === 'warn' || level === 'error') {
    // eslint-disable-next-line no-console
    console[level](`${tag} ${timestamp()} ${msg}`, meta ?? '')
  }
  report(level, msg, meta)
}

export const logger = {
  debug: (module: string, msg: string, meta?: unknown) => emit('debug', module, msg, meta),
  info: (module: string, msg: string, meta?: unknown) => emit('info', module, msg, meta),
  warn: (module: string, msg: string, meta?: unknown) => emit('warn', module, msg, meta),
  error: (module: string, msg: string, meta?: unknown) => emit('error', module, msg, meta)
}
