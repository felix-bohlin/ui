export type Props = {
  [key: string]: any
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
  variant?: "tonal" | "outlined"
}

export type Slots<S> = {
  icon?: S
  title?: S
}
