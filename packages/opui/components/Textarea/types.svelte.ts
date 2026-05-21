import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type InputProps = {
  type?: SvelteHTMLElements["input"]["type"] | "numeric"
}

type Snippets = Partial<Record<Base.Slots, string | Snippet>>

export type Props =
  // Unique component props, except snippets
  Omit<Base.Props, keyof Snippets> &
    // All html label attributes, (except prefix)
    Omit<SvelteHTMLElements["label"], "prefix"> &
    // Some input attributes for spreading
    Pick<SvelteHTMLElements["textarea"], Base.TextareaProps> &
    // Special input type attribute with 'numeric'
    InputProps &
    // Snippets
    Snippets
