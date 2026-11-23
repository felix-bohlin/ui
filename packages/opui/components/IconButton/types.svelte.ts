import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props =
  | (Base.Props & { as?: "button" } & SvelteHTMLElements["button"])
  | (Base.Props & { as?: "a" } & SvelteHTMLElements["a"])
