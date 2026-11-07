import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props =
  | (Base.Props & { as?: "legend" } & SvelteHTMLElements["legend"])
  | (Base.Props & { as: "p" } & SvelteHTMLElements["p"])
