export type Props = {
  card?: boolean
  endText?: string
  error?: boolean
  hideLabel?: boolean
  label?: string
  orientation?: "horizontal" | "vertical"
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
  variant?: "elevated" | "outlined" | "tonal"
}

export type Slots<S> = {
  endText?: string | S
  iconChecked?: S
  iconUnchecked?: S
}

export type SwitchInputProps = {}
