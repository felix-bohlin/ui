export type Props = {
  command?: string
  commandfor?: string
  interestfor?: string
  isGroup?: boolean
  variant?: "squared" | "rounded" | "squircle"
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
      as?: "button"
      href?: never
      disabled?: boolean
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

export type Slots<S> = {
  children?: S
}
