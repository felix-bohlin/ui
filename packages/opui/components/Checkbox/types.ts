export type Props = {
  endText?: string
  error?: boolean
  hideLabel?: boolean
  indeterminate?: boolean
  label?: string
  orientation?: "horizontal" | "vertical"
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
}

export type Slots<S> = {
  endText?: string | S
}

export type CheckboxInputProps = {
  indeterminate?: boolean
}
