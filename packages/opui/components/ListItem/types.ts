export type Props = {
  borderTop?: boolean
  color?: "critical"
  description?: string
  for?: string
  headline?: string
  inset?: boolean
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
  end?: S
  start?: S
  submenu?: S
  text?: S
}
