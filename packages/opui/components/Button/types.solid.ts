import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"

export type Props =
  | (Base.Props &
      Base.Slots<JSX.Element> & {
        as?: "button"
        href?: never
      } & ComponentProps<"button">)
  | (Base.Props &
      Base.Slots<JSX.Element> & {
        as?: "a"
        href: string
      } & ComponentProps<"a">)
