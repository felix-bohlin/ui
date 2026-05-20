import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

// prettier-ignore
export type Props<T extends keyof SvelteHTMLElements= "form"> =
  | (Base.Props & { as?: T } & SvelteHTMLElements[T])
