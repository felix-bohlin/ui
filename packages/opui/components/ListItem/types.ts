export type Props = {
  borderTop?: boolean
  critical?: boolean
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
  end?: string | S
  start?: string | S
  submenu?: string | S
  text?: string | S
}
