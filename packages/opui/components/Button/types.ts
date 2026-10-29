export type Props = {
  color?: "critical" | "primary"
  round?: boolean
  size?: "x-small" | "small" | "medium" | "large"
  variant?: "filled" | "outlined" | "tonal" | "transparent"
} & (
  | {
      as?: "a"
      disabled?: boolean
      href: string
    }
  | {
      as?: "button"
      disabled?: boolean
      href?: never
    }
)

export type Slots<S> =
  | {
      "aria-label": string
      children?: S
    }
  | {
      "aria-labelledby": string
      children?: S
    }
  | {
      "aria-label"?: string
      "aria-labelledby"?: string
      children: S
    }
