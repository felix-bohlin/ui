import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  Base.Selection<{ value?: string }, { value?: string[] }> &
  Omit<SvelteHTMLElements["div"], "size">
