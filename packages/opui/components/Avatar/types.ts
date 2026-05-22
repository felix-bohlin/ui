export type Props = {
  isGroup?: boolean
  variant?: "squared" | "rounded" | "squircle"
} & (
  | {
      as?: "div"
      href: never
      disabled?: never
    }
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
)

export type Slots<S> = {
  children?: S
}

export type ImageProps = "src" | "alt"
