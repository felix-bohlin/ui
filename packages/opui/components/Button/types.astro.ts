import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props =
  | (Base.Props & { as?: "button"; href?: never } & HTMLAttributes<"button">)
  | (Base.Props & { as?: "a"; href: string } & HTMLAttributes<"a">)
