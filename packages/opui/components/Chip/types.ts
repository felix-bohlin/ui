export type Props = {
  [key: string]: any
  as?: "a" | "button" | "div" | string
  label?: string
  multiline?: boolean
  size?: "small"
  variant?: "tonal" | "outlined"
}

export type Slots<S> = {
  end?: S
  start?: S
}
