export type CheckboxProps = {
  disabled?: boolean
  error?: boolean
  hideLabel?: boolean
  indeterminate?: boolean
  size?: "small" | "large"
  spread?: boolean
  stack?: boolean
}

export type CheckboxSlots<S> = {
  endText?: string | S
}

export type CheckboxInputProps = {
  indeterminate?: boolean
}
