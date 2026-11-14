import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props =
  // Unique component props
  Without<
    Base.Props,
    "bottom" | "end" | "endText" | "label" | "start" | "startText" | "top"
  > &
    Base.Slots<Snippet> &
    // Input attributes
    // include the rest
    Omit<SvelteHTMLElements["input"], "size">
