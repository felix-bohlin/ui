export type Props = {
  endText?: string
  error?: boolean
  hideLabel?: boolean
  indeterminate?: boolean
  size?: "x-small" | "small" | "large"
  spread?: boolean
  stack?: boolean
}

export type Slots<S> = {
  endText?: string | S
}

export type CheckboxInputProps = {
  indeterminate?: boolean
}
