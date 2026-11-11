export type Props = {
  decreaseLabel?: string
  disabled?: boolean
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
  decreaseIcon?: S
  endText?: string | S
  increaseIcon?: S
  label?: string | S
  startText?: string | S
}
