export type CheckboxProps = {
  error?: boolean
  hideLabel?: boolean
  indeterminate?: boolean
  size?: "x-small" | "small" | "large"
  spread?: boolean
  stack?: boolean
}

export type CheckboxSlots<S> = {
  endText?: string | S
}

export type CheckboxInputProps = {
  indeterminate?: boolean
}
