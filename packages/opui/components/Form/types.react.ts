import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props =
  | (Base.Props & { as?: "form" } & ComponentProps<"form">)
  | (Base.Props & { as: "div" } & ComponentProps<"div">)
