export type Props = {
  headingLevel?: 2 | 3 | 4 | 5 | 6
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
  variant?: "tonal" | "outlined"
}

export type Slots<S> = {
  icon?: S
  title?: S
}
