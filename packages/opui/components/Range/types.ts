export type RangeItem =
  string | number | { label?: string; value: string | number }

export type Props = {
  endText?: string
  error?: boolean
  hideLabel?: boolean
  items?: RangeItem[]
  label?: string
  list?: string
  size?: "x-small" | "small" | "medium" | "large"
  spread?: boolean
  startText?: string
  value?: number | string
  valueSuffix?: string
  variant?: "filled" | "outlined" | "tonal"
}

export type Slots<S> = {
  datalist?: S
  endText?: string | S
  label?: string | S
  startText?: string | S
}
