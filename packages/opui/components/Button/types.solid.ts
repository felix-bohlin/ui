import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"

export type Props =
  | (Base.Props &
      Base.Slots<JSX.Element> & { as?: "button"; href?: never } & Omit<
        ComponentProps<"button">,
        "disabled"
      >)
  | (Base.Props &
      Base.Slots<JSX.Element> & { as?: "a"; href: string } & Omit<
        ComponentProps<"a">,
        "href"
      >)
