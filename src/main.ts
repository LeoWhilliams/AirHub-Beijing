import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/plugins/echarts'
import '@/styles/global.scss'
import App from './App.vue'
import { logger } from '@/utils/logger'

logger.info('bootstrap', 'AirHub-Beijing starting')

createApp(App).use(createPinia()).mount('#app')
