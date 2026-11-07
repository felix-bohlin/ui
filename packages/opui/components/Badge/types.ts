export type Props = {
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  corner?: "start-start" | "start-end" | "end-start" | "end-end"
  dot?: boolean
  hideLabel?: boolean
  invisible?: boolean
  label?: string
}

export type Slots<S> = {
  indicator?: S
}
