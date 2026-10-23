export type Props = {
  dot?: boolean
  label?: string
  multiline?: boolean
  severity?: "critical" | "info" | "neutral" | "success" | "warning"
  size?: "x-small" | "small" | "medium" | "large"
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
