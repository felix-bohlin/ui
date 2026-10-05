export type Props = {
  borderTop?: boolean
  description?: string
  for?: string
  headline?: string
  inset?: boolean
  type?: "checkbox" | "radio" | "switch"
} & (
  | {
      as?: "a"
      disabled?: never
      href: string
    }
  | {
      as: "button"
      disabled?: boolean
      href?: never
    }
  | {
      as: "div"
      disabled?: never
      href?: never
    }
  | {
      as?: never
      disabled?: never
      href?: never
    }
)

export type Slots<S> = {
  end?: string | S
  start?: string | S
  submenu?: string | S
  text?: string | S
}
