export type Props = {
  color?: "critical" | "info" | "neutral" | "success" | "warning"
  dot?: boolean
  label?: string
  multiline?: boolean
  size?: "x-small" | "small" | "large"
  variant?: "outlined" | "tonal"
} & (
  | {
      as?: "div"
      disabled?: never
      href?: never
    }
  | {
      as?: "a"
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
  start?: S
}
