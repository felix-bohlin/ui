import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & ComponentProps<"div">
export type TabsItemProps = Base.TabsItemProps &
  Omit<ComponentProps<"input">, "type">
export type TabsPanelProps = Base.TabsPanelProps & ComponentProps<"div">
export type TabsLabelProps = Base.TabsLabelProps & ComponentProps<"label">
