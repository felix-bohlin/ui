export type Props = {
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  corner?: "start-start" | "start-end" | "end-start" | "end-end"
  dot?: boolean
  invisible?: boolean
  label?: string | number
  srLabel?: string
}

export type Slots<S> = {
  indicator?: S
}
