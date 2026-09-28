import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

// prettier-ignore
export type Props<T extends keyof SvelteHTMLElements = keyof SvelteHTMLElements> =
  | (Base.Props & { as?: "fieldset" } & SvelteHTMLElements["fieldset"])
  | (Base.Props & { as: T } & SvelteHTMLElements[T])

export type Context = Base.Context
