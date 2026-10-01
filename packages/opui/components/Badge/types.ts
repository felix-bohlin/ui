export type Props = {
  alignment?: "start-start" | "end-start" | "end-end"
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  dot?: boolean
  invisible?: boolean
  label?: string | number
}

export type Slots<S> = {
  indicator?: S
}
