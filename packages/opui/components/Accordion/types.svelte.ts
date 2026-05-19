import type { BaseProps } from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = BaseProps & {
  actions?: Snippet
  children: Snippet
  marker?: Snippet
  summary: string | Snippet
} & SvelteHTMLElements["details"]
