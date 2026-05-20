import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

// prettier-ignore
export type Props =
  | (Base.Props & { as?: never, href?: never } & HTMLAttributes<"li">)
  | (Base.Props & { as?: "a", href: string } & HTMLAttributes<"a">)
  | (Base.Props & { as?: "button", href?: never } & HTMLAttributes<"button">)
  | (Base.Props & { as?: "div", href?: never } & HTMLAttributes<"div">)
