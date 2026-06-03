import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props =
  | (Base.Props & { as?: "legend" } & HTMLAttributes<"legend">)
  | (Base.Props & { as: "p" } & HTMLAttributes<"p">)
