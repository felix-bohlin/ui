import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props =
  | (Base.Props & { as?: "legend" } & ComponentProps<"legend">)
  | (Base.Props & { as: "p" } & ComponentProps<"p">)
