import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type InputProps = {
  // Add 'numeric' as valid input type
  type?: SvelteHTMLElements["input"]["type"] | "numeric"
} &
  // include the rest
  Omit<SvelteHTMLElements["input"], "size" | "type">

type Snippets = Partial<Base.Slots<Snippet>>

export type Props =
  // Unique component props, except snippets
  Omit<Base.Props, keyof Snippets> &
    // Input attributes
    Omit<InputProps, keyof Snippets> &
    // Snippets
    Snippets
