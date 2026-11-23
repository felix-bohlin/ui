import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"div">

export type TabsItemProps = Base.TabsItemProps &
  Omit<HTMLAttributes<"input">, "type">

export type TabsTabProps = Base.TabsTabProps & HTMLAttributes<"label">

export type TabsPanelProps = Base.TabsPanelProps & HTMLAttributes<"div">
