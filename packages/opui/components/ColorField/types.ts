export type Props = {
  alpha?: boolean
  endText?: string
  error?: boolean
  hideLabel?: boolean
  label?: string
  pickerLabel?: string
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
  startText?: string
  variant?: "outlined" | "filled"
}

export type Slots<S> = {
  endText?: string | S
  label?: string | S
  startText?: string | S
}
