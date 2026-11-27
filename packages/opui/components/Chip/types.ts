export type Props<Link = never> = {
  color?: "accent"
  dot?: boolean
  label?: string
  multiline?: boolean
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
  size?: "x-small" | "small" | "medium" | "large"
  variant?: "outlined" | "tonal"
} & (
  | {
      as?: "div" | "span"
      disabled?: never
      href?: never
    }
  | {
      as?: "a" | Link
      disabled?: boolean
      href: string
    }
  | {
      as: "button"
      disabled?: boolean
      href?: never
    }
)

export type Slots<S> = {
  end?: S
  label?: string | S
  start?: S
}
