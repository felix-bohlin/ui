import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<
  Base.Props,
  "bottom" | "end" | "endText" | "label" | "start" | "startText" | "top"
> &
  Base.Slots<Snippet> &
  Omit<SvelteHTMLElements["select"], "size">
