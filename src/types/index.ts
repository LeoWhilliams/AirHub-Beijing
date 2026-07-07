export interface FlightPoint {
  time: string
  takeoff: number
  landing: number
}

export interface FlightSummary {
  totalToday: number
  onTimeRate: number
  takeoffCount: number
  landingCount: number
  trend: FlightPoint[]
}

export interface PassengerRegion {
  name: string
  value: number
}

export interface PassengerSummary {
  totalThroughput: number
  regions: PassengerRegion[]
}

export interface BaggagePoint {
  hour: string
  sorted: number
  abnormal: number
}

export interface BaggageSummary {
  totalHandled: number
  hourly: BaggagePoint[]
}

export interface SecuritySummary {
  pressure: number
  lanesOpen: number
  lanesTotal: number
  avgWaitSeconds: number
}

export interface DashboardEvent {
  id: string
  time: string
  level: 'info' | 'warning' | 'error'
  message: string
}
