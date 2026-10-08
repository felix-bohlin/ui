export type StepperItem = {
  description?: string
  href?: string
  label: string
}

export type Props = {
  completedLabel?: string
  current?: number
  items?: StepperItem[]
  label?: string
  orientation?: "vertical"
  size?: "small"
}

export type Slots<S> = {
  check?: S
  children?: S
}
