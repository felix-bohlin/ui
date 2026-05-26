export type Props = {
  borderTop?: boolean
  class?: string
  description?: string
  for?: string
  headline?: string
  inset?: boolean
  type?: "checkbox" | "radio" | "switch" | "button"
} & (
  | {
      as?: "a"
      href: string
      disabled?: never
    }
  | {
      as?: "button"
      href?: never
      disabled?: boolean
    }
  | {
      as?: string
      href?: never
    }
)

export type Slots<S> = {
  description?: string | S
  end?: string | S
  headline?: string | S
  start?: string | S
  text?: string | S
}
