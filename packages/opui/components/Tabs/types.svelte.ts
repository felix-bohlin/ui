import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  SvelteHTMLElements["div"] & {
    ref?: HTMLDivElement | null
  }
export type TabsItemProps = Base.TabsItemProps &
  Omit<SvelteHTMLElements["input"], "type"> & {
    ref?: HTMLInputElement | null
  }
export type TabsPanelProps = Base.TabsPanelProps &
  SvelteHTMLElements["div"] & {
    ref?: HTMLDivElement | null
  }
export type TabsTabProps = Base.TabsTabProps &
  Omit<SvelteHTMLElements["label"], "for"> & {
    for?: string
    ref?: HTMLLabelElement | null
  }
