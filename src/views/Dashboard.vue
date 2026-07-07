<script setup lang="ts">
import { computed } from 'vue'
import ScreenHeader from '@/components/header/ScreenHeader.vue'
import PanelBox from '@/components/panels/PanelBox.vue'
import FlightTrend from '@/components/charts/FlightTrend.vue'
import PassengerPie from '@/components/charts/PassengerPie.vue'
import BaggageBar from '@/components/charts/BaggageBar.vue'
import SecurityGauge from '@/components/charts/SecurityGauge.vue'
import AirportMap from '@/components/AirportMap.vue'
import EventTicker from '@/components/EventTicker.vue'
import { useScreenScale } from '@/composables/useScreenScale'
import { usePolling } from '@/composables/usePolling'
import { useFlightStore } from '@/store/flight'
import { usePassengerStore } from '@/store/passenger'
import { useBaggageStore } from '@/store/baggage'
import { useSecurityStore } from '@/store/security'
import { useEventStore } from '@/store/events'

const { scale, offsetX, offsetY, designWidth, designHeight } = useScreenScale()

const flightStore = useFlightStore()
const passengerStore = usePassengerStore()
const baggageStore = useBaggageStore()
const securityStore = useSecurityStore()
const eventStore = useEventStore()

const metrics = computed(() => [
  { label: '今日航班', value: flightStore.data?.totalToday ?? 0, unit: '架次', color: '#36cfc9' },
  {
    label: '旅客吞吐',
    value: passengerStore.data?.totalThroughput ?? 0,
    unit: '人次',
    color: '#1890ff'
  },
  {
    label: '准点率',
    value: Math.round((flightStore.data?.onTimeRate ?? 0) * 100),
    unit: '%',
    color: '#52c41a'
  },
  {
    label: '行李处理',
    value: baggageStore.data?.totalHandled ?? 0,
    unit: '件',
    color: '#faad14'
  }
])

usePolling(() => {
  flightStore.fetch()
  passengerStore.fetch()
  baggageStore.fetch()
  securityStore.fetch()
  eventStore.fetch()
}, 5000)
</script>

<template>
  <div class="screen-viewport">
    <div
      class="screen"
      :style="{
        width: designWidth + 'px',
        height: designHeight + 'px',
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
      }"
    >
      <ScreenHeader />

      <div class="content">
        <section class="col left">
          <PanelBox title="航班起降趋势" class="box">
            <FlightTrend :data="flightStore.data" :loading="flightStore.loading" />
          </PanelBox>
          <PanelBox title="各区域客流占比" class="box">
            <PassengerPie :data="passengerStore.data" :loading="passengerStore.loading" />
          </PanelBox>
        </section>

        <section class="col center">
          <div class="metrics">
            <div
              v-for="m in metrics"
              :key="m.label"
              class="metric"
              :style="{ borderColor: m.color }"
            >
              <div class="metric-value" :style="{ color: m.color }">
                {{ m.value }}<small>{{ m.unit }}</small>
              </div>
              <div class="metric-label">{{ m.label }}</div>
            </div>
          </div>
          <PanelBox title="实时航线态势" class="box grow">
            <AirportMap :pressure="securityStore.data?.pressure" />
          </PanelBox>
        </section>

        <section class="col right">
          <PanelBox title="行李分拣量" class="box">
            <BaggageBar :data="baggageStore.data" :loading="baggageStore.loading" />
          </PanelBox>
          <PanelBox title="安检通行压力" class="box">
            <SecurityGauge :data="securityStore.data" :loading="securityStore.loading" />
          </PanelBox>
        </section>
      </div>

      <div class="footer">
        <PanelBox title="实时运行事件">
          <EventTicker :items="eventStore.list" />
        </PanelBox>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.screen-viewport {
  position: fixed;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, #0a1c3a 0%, #061024 70%);
  overflow: hidden;
}

.screen {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1.3fr 1fr;
  gap: $gap;
  height: 820px;
  padding: 0 $gap;
}

.col {
  display: flex;
  flex-direction: column;
  gap: $gap;
  min-height: 0;
}

.box {
  flex: 1;
  min-height: 0;
}

.center {
  .metrics {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $gap;
  }

  .grow {
    flex: 1.4;
  }
}

.metric {
  background: $color-panel;
  border: 1px solid;
  border-radius: $radius;
  padding: 14px 10px;
  text-align: center;
  backdrop-filter: blur(4px);
  animation: ah-fade-up 0.6s ease both;
}

.metric-value {
  font-size: 30px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;

  small {
    font-size: 12px;
    font-weight: 400;
    margin-left: 4px;
    opacity: 0.8;
  }
}

.metric-label {
  margin-top: 4px;
  font-size: 13px;
  color: $color-text-dim;
  letter-spacing: 1px;
}

.footer {
  height: 120px;
  margin: $gap;
  margin-top: 0;
}
</style>
