import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & {
  onReaction?: (event: Base.Events["reaction"]) => void
} & Omit<ComponentProps<"opui-reactions">, "onReaction">
