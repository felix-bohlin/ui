export type Props = {
  autoFit?: boolean
  description?: string
  endText?: string
  error?: boolean
  label?: string
  size?: "x-small" | "small" | "large"
  spread?: boolean
  variant?: "outlined" | "filled"
}

export type Slots<S> = {
  description?: string | S
  endText?: string | S
  footer?: string | S
  header?: string | S
  label?: string | S
  prefix?: string | S
  suffix?: string | S
}
