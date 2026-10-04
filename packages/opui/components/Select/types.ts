export type Props = {
  dense?: boolean
  description?: string
  endText?: string
  error?: boolean
  items?: Item[]
  label?: string
  size?: "x-small" | "small" | "large"
  spread?: boolean
  variant?: "outlined" | "filled"
}

export type Item = {
  selected?: boolean
  text: string
  value: any
}

export type Slots<S> = {
  children?: S
  description?: string | S
  endText?: string | S
  footer?: string | S
  header?: string | S
  label?: string | S
  prefix?: string | S
  suffix?: string | S
}
