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
      disabled?: never
      href: string
      type?: never
    }
  | {
      as: "button"
      disabled?: boolean
      href?: never
      type?: never
    }
  | {
      as: "div"
      disabled?: never
      href?: never
      type?: never
    }
  | {
      as?: never
      disabled?: never
      href?: never
      type?: "checkbox" | "radio" | "switch"
    }
)

export type Slots<S> = {
  description?: string | S
  end?: S
  label?: string | S
  start?: S
  submenu?: S
}
