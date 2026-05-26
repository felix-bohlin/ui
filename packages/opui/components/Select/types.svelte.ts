import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = Omit<Base.Props, keyof Base.Slots<Snippet>> &
  Base.Slots<Snippet> &
  Omit<SvelteHTMLElements["select"], "prefix" | "size">
