import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  Omit<SvelteHTMLElements["input"], "size" | "type">
