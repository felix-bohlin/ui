export type Props = {
  as?: "a" | "button" | "div" | (string & {})
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  dot?: boolean
  href?: string
  label?: string
  multiline?: boolean
  size?: "x-small" | "small" | "large"
  variant?: "tonal" | "outlined"
}

export type Slots<S> = {
  end?: S
  start?: S
}
