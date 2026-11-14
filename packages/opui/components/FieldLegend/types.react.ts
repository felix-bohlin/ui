import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props =
  | (Base.Props & { as?: "legend" } & ComponentProps<"legend">)
  | (Base.Props & { as: "p" } & ComponentProps<"p">)
