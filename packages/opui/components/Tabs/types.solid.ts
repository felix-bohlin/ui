import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props & JSX.HTMLAttributes<HTMLDivElement>

export type TabsItemProps = Base.TabsItemProps &
  Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type">

export type TabsPanelProps = Base.TabsPanelProps &
  JSX.HTMLAttributes<HTMLDivElement>

export type TabsTabProps = Base.TabsTabProps &
  JSX.LabelHTMLAttributes<HTMLLabelElement>
