export type Props = {
  endText?: string
  error?: boolean
  hideLabel?: boolean
  orientation?: "horizontal" | "vertical"
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
}

export type Slots<S> = {
  endText?: string | S
  iconChecked?: S
  iconUnchecked?: S
}

export type SwitchInputProps = {}
