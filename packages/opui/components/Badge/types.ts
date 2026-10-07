export type Props = {
  alignment?: "start-start" | "start-end" | "end-start" | "end-end"
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  dot?: boolean
  invisible?: boolean
  label?: string | number
  srLabel?: string
}

export type Slots<S> = {
  indicator?: S
}
