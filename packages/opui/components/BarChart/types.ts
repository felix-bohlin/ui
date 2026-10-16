export type BarChartRow = {
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  label: string
  values: number[]
}

export type Props = {
  caption?: string
  focusable?: boolean
  format?: (value: number) => string
  label?: string
  max?: number
  min?: number
  rows?: BarChartRow[]
  series?: string[]
  size?: "small" | "large"
}

export type Slots<S> = {
  children?: S
}
