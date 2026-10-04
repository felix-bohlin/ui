export type Props = {
  as?: "a" | "button" | "div" | (string & {})
  href?: string
  label?: string
  multiline?: boolean
  size?: "small" | "large"
  variant?: "tonal" | "outlined"
}

export type Slots<S> = {
  end?: S
  start?: S
}
