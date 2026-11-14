export type Props = {
  borderTop?: boolean
  color?: "critical"
  description?: string
  for?: string
  inset?: boolean
  label?: string
} & (
  | {
      as?: "a"
      choice?: never
      disabled?: boolean
      href: string
    }
  | {
      as: "button"
      choice?: never
      disabled?: boolean
      href?: never
    }
  | {
      as?: never
      choice?: "checkbox" | "radio" | "switch"
      disabled?: never
      href?: never
    }
)

export type Slots<S> = {
  description?: string | S
  end?: S
  iconChecked?: S
  label?: string | S
  start?: S
  submenu?: S
}
