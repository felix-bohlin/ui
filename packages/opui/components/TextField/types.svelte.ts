import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type InputProps = {
  // Add 'numeric' as valid input type
  type?: SvelteHTMLElements["input"]["type"] | "numeric"
} &
  // include the rest
  Pick<SvelteHTMLElements["input"], Exclude<Base.InputProps, "type">>

type Snippets = Partial<Record<Base.Slots, string | Snippet>>

export type Props =
  // Unique component props, except snippets
  Omit<Base.Props, keyof Snippets> &
    // All html label attributes, (except prefix)
    Omit<SvelteHTMLElements["label"], "prefix"> &
    // Input attributes
    InputProps &
    // Snippets
    Snippets
