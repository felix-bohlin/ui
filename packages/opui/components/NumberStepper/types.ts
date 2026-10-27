export type Props = {
  decreaseLabel?: string
  endText?: string
  error?: boolean
  hideLabel?: boolean
  increaseLabel?: string
  label?: string
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
  startText?: string
  stretch?: boolean
  variant?: "outlined" | "filled"
}

export type Slots<S> = {
  endText?: string | S
  label?: string | S
  startText?: string | S
}
