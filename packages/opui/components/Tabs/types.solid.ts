import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props = Base.Props & {
  onValueChange?: (value: string) => void
  value?: string
} & ComponentProps<"div">

export type TabsItemProps = Base.TabsItemProps &
  Omit<ComponentProps<"input">, "checked" | "name" | "type">

export type TabsPanelProps = Base.TabsPanelProps & ComponentProps<"div">

export type TabsLabelProps = Base.TabsLabelProps & ComponentProps<"label">
