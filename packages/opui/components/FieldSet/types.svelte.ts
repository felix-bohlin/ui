import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props =
  | (Base.Props & { as?: "fieldset" } & SvelteHTMLElements["fieldset"])
  | (Base.Props & { as: "div" } & SvelteHTMLElements["div"])

export type Context = Base.Context
