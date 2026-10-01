export type Props = {
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
  variant?: "tonal" | "outlined"
}

export type Slots<S> = {
  icon?: S
  title?: S
}
