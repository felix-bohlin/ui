import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props =
  | (Base.Props & { as?: "fieldset" } & ComponentProps<"fieldset">)
  | (Base.Props & { as: "div" } & ComponentProps<"div">)
