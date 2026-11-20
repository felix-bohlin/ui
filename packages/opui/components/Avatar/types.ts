export type Props<Link = never> = {
  label?: string
  shape?: "circle" | "rounded" | "squared" | "squircle"
  size?: "x-small" | "small" | "medium" | "large"
  src?: string
  variant?: "filled" | "outlined" | "tonal"
} & (
  | {
      as?: "div"
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

export type Named =
  | { label: string }
  | { "aria-label": string }
  | { "aria-labelledby": string }

export type AvatarGroupProps =
  | { "aria-label": string }
  | { "aria-labelledby": string }
