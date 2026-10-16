export type Props = {
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  dot?: boolean
  label?: string
  multiline?: boolean
  size?: "x-small" | "small" | "large"
  variant?: "tonal" | "outlined"
} & (
  | {
      as?: "div"
      href?: never
      disabled?: never
    }
  | {
      as?: "a"
      href: string
      disabled?: never
    }
  | {
      as: "button"
      href?: never
      disabled?: boolean
    }
)

export type Slots<S> = {
  end?: S
  start?: S
}
