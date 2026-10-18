export type RangeOption =
  string | number | { value: string | number; label?: string }

export type Props = {
  endText?: string
  error?: boolean
  label?: string
  list?: string
  options?: RangeOption[]
  spread?: boolean
  startText?: string
  value?: number | string
  valueSuffix?: string
  variant?: "filled" | "tonal"
}

export type Slots<S> = {
  datalist?: S
  endText?: string | S
  startText?: string | S
  valueSuffix?: string | S
}
