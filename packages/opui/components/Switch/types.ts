export type SwitchProps = {
  endText?: string
  error?: boolean
  hideLabel?: boolean
  size?: "x-small" | "small" | "large"
  spread?: boolean
  stack?: boolean
}

export type SwitchSlots<S> = {
  endText?: string | S
  iconChecked?: S
  iconUnchecked?: S
}

export type SwitchInputProps = {}
