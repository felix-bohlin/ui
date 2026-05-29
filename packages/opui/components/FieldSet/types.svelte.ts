import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Slots = {
  children: Snippet
}

// prettier-ignore
export type Props<T extends keyof SvelteHTMLElements= "fieldset"> =
Base.Props
& { as?: T }
& Omit<SvelteHTMLElements[T], keyof Slots>
& Slots
