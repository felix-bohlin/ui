import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type InputProps = {
  type?: SvelteHTMLElements["input"]["type"] | "numeric"
}

type Snippets = {
  description?: string | Snippet
  endText?: string | Snippet
  footer?: string | Snippet
  header?: string | Snippet
  label?: string | Snippet
  prefix?: string | Snippet
  startText?: string | Snippet
  suffix?: string | Snippet
}

export type Props =
  // Unique component props, except snippets
  Omit<Base.Props, keyof Snippets> &
    // All html label attributes, (except prefix)
    Omit<SvelteHTMLElements["label"], "prefix"> &
    // Some input attributes for spreading
    Pick<SvelteHTMLElements["input"], Base.InputProps> &
    // Special input type attribute with 'numeric'
    InputProps &
    // Snippets
    Snippets
