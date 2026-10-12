import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props =
  | (Base.Props & { as?: "button" } & ComponentProps<"button">)
  | (Base.Props & { as?: "a" } & ComponentProps<"a">)
