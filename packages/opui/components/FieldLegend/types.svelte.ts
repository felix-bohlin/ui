import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

type Ref = { ref?: HTMLElement | null }

// prettier-ignore
export type Props<T extends keyof SvelteHTMLElements = keyof SvelteHTMLElements> =
  | (Base.Props & Ref & { as?: "legend" } & SvelteHTMLElements["legend"])
  | (Base.Props & Ref & { as: T } & SvelteHTMLElements[T])
