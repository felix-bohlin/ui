export type StepperItemProps = {
  complete?: boolean
  completedLabel?: string
  current?: boolean
  description?: string
  error?: boolean
  errorLabel?: string
  href?: string
  label?: string
}

export type Props = {
  complete?: boolean
  completedLabel?: string
  current?: number
  errorLabel?: string
  items?: StepperItemProps[]
  orientation?: "auto" | "horizontal" | "vertical"
  size?: "small" | "medium"
}

export type StepperItemSlots<S> = {
  description?: string | S
  iconChecked?: S
  label?: string | S
}
