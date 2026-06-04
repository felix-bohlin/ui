export type RangeProps = {
  [key: string]: any
  endText?: string
  id?: string
  label?: string
  spread?: boolean
  startText?: string
  value?: number | string
  valueSuffix?: string
  variant?: "filled" | "default" | "tonal"
} & (
  | { list?: never; options?: never }
  | {
      list: string
      options: (string | number | { value: string | number; label?: string })[]
    }
)

export type RangeSlots<S> = {
  datalist?: S
  endText?: string | S
  startText?: string | S
  valueSuffix?: string | S
  valueText?: S
}
