import type { Snippet } from "svelte"
import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  Base.Slots<Snippet> &
  Omit<SvelteHTMLElements["input"], "size" | "type">
