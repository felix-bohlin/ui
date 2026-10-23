export type Props = {
  dense?: boolean
  endText?: string
  error?: boolean
  items?: SelectItem[]
  label?: string
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
  startText?: string
  variant?: "outlined" | "filled"
}

export type SelectItem = {
  selected?: boolean
  text: string
  value: number | string
}

export type Slots<S> = {
  children?: S
  endText?: string | S
  footer?: string | S
  header?: string | S
  label?: string | S
  prefix?: string | S
  startText?: string | S
  suffix?: string | S
}
