import axios from 'axios'
import { logger } from '@/utils/logger'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000
})

request.interceptors.request.use(
  (config) => {
    logger.debug('http', `→ ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    logger.error('http', 'request error', error?.message)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    logger.debug('http', `← ${response.status} ${response.config.url}`)
    return response.data
  },
  (error) => {
    const msg = error?.response?.data?.message || error?.message || 'unknown error'
    logger.error('http', `request failed: ${error?.config?.url}`, msg)
    return Promise.reject(error)
  }
)

export default request
