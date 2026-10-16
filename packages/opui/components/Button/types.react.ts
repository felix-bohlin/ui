import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props =
  | (Base.Props & { as?: "button"; href?: never } & ComponentProps<"button">)
  | (Base.Props & { as?: "a"; href: string } & ComponentProps<"a">)
