import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

// prettier-ignore
export type Props<T extends keyof SvelteHTMLElements= "legend"> =
  | (Base.Props & { as?: T } & SvelteHTMLElements[T])
