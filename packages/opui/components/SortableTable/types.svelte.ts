import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & {
  onsort?: (event: Base.Events["sort"]) => void
} & Omit<SvelteHTMLElements["opui-sortable-table"], "onsort">
