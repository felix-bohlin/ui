import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = Base.Props & {
  action?: Snippet
  header?: Snippet
  children?: Snippet
  content?: Snippet
} & SvelteHTMLElements["div"]
