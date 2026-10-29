import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & {
  defaultValue?: string
  onValueChange?: (value: string) => void
  value?: string
} & Omit<ComponentProps<"div">, "defaultValue">
export type TabsItemProps = Base.TabsItemProps &
  Omit<ComponentProps<"input">, "type">
export type TabsPanelProps = Base.TabsPanelProps & ComponentProps<"div">
export type TabsLabelProps = Base.TabsLabelProps & ComponentProps<"label">
