import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "endText" | "label" | "startText"> &
  Base.Slots<Snippet> &
  Omit<SvelteHTMLElements["input"], "children" | "type" | keyof Base.Props>
