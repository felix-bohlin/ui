import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props =
  | (Base.Props & { as?: "form" } & SvelteHTMLElements["form"])
  | (Base.Props & { as: "div" } & SvelteHTMLElements["div"])
