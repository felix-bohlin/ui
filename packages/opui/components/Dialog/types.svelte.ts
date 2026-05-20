import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type CommonProps = {
  actions: Snippet
  content: Snippet
  header: Snippet
}

export type Props = Base.Props & CommonProps & SvelteHTMLElements["dialog"]
