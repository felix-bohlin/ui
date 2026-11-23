import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & SvelteHTMLElements["div"]
export type TabsItemProps = Base.TabsItemProps & SvelteHTMLElements["input"]
export type TabsPanelProps = Base.TabsPanelProps & SvelteHTMLElements["div"]
export type TabsTabProps = Base.TabsTabProps &
  Omit<SvelteHTMLElements["label"], "for"> & {
    for?: string
  }
