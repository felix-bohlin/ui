import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type ClassicSelectProps = Base.ClassicSelectProps &
  Omit<SvelteHTMLElements["select"], "size">
