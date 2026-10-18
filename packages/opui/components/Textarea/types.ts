export type Props = {
  autoFit?: boolean
  endText?: string
  error?: boolean
  label?: string
  size?: "x-small" | "small" | "large"
  spread?: boolean
  startText?: string
  variant?: "outlined" | "filled"
}

export type Slots<S> = {
  endText?: string | S
  footer?: string | S
  header?: string | S
  label?: string | S
  prefix?: string | S
  startText?: string | S
  suffix?: string | S
}
