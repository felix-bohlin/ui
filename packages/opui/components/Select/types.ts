export type Props = {
  autoFit?: boolean
  dense?: boolean
  endText?: string
  error?: boolean
  hideLabel?: boolean
  items?: SelectItem[]
  label?: string
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
  startText?: string
  variant?: "outlined" | "filled"
}

export type SelectItem = {
  label: string
  selected?: boolean
  value: number | string
}

export type Slots<S> = {
  bottom?: string | S
  children?: S
  end?: string | S
  endText?: string | S
  label?: string | S
  start?: string | S
  startText?: string | S
  top?: string | S
}
