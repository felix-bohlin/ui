import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Partial<Base.Slots<Snippet>>

export type Props =
  // Unique component props, except snippets
  Omit<Base.Props, keyof Snippets> &
    // Some input attributes for spreading
    Omit<SvelteHTMLElements["textarea"], keyof Snippets> &
    // Snippets
    Snippets
