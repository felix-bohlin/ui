import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & {
  onremove?: (event: Base.Events["remove"]) => void
  onselect?: (event: Base.Events["select"]) => void
} & Omit<
    SvelteHTMLElements["opui-file-upload"],
    "children" | "onremove" | "onselect"
  >
