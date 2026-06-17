export type Props = {
  error?: boolean
  dense?: boolean
  description?: string
  items?: Item[]
  label?: string
  spread?: boolean
  size?: "small"
  endText?: string
  variant?: "outlined" | "filled"
}

export type Item = {
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
