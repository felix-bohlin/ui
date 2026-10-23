import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"div">

export type TabsItemProps = Base.TabsItemProps &
  Omit<HTMLAttributes<"input">, "type">

export type TabsPanelProps = Base.TabsPanelProps & HTMLAttributes<"div">

export type TabsLabelProps = Base.TabsLabelProps & HTMLAttributes<"label">
