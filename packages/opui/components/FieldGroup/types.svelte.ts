import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Slots = {
  children?: Snippet
}

export type Props = Base.Props & SvelteHTMLElements["div"] & Slots
