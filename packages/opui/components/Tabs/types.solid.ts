import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.HTMLAttributes<HTMLDivElement>
export type TabsItemProps = Base.TabsItemProps &
  JSX.InputHTMLAttributes<HTMLInputElement>
export type TabsTabProps = Base.TabsTabProps &
  Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "for"> & {
    for?: string
  }
export type TabsPanelProps = Base.TabsPanelProps &
  JSX.HTMLAttributes<HTMLDivElement>
