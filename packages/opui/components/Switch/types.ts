export type SwitchProps = {
  critical?: boolean
  hideLabel?: boolean
  small?: boolean
  spread?: boolean
  stack?: boolean
}

export type SwitchSlots<S> = {
  children?: S
  endText?: string | S
  iconUnchecked?: S
  iconChecked?: S
}

export type SwitchInputProps = {}
