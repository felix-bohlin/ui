import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & {
  onRemove?: (event: Base.Events["remove"]) => void
  onSelect?: (event: Base.Events["select"]) => void
} & Omit<
    ComponentProps<"opui-file-upload">,
    "children" | "onRemove" | "onSelect"
  >
