import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props =
  | (Base.Props & { as?: "form" } & HTMLAttributes<"form">)
  | (Base.Props & { as: "div" } & HTMLAttributes<"div">)
