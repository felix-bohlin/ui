export type Props = {
  shape?: "circle" | "rounded" | "squared" | "squircle"
  size?: "x-small" | "small" | "medium" | "large"
} & (
  | {
      as?: "div"
      disabled?: never
      href?: never
    }
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
) &
  (
    | {
        alt: string
        src: string
      }
    | {
        alt?: never
        src?: never
      }
  )

export type AvatarGroupProps = {}

export type Slots<S> = {
  children?: S
}
