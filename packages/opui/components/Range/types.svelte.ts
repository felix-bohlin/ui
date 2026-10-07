import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Omit<Base.RangeSlots<Snippet>, "valueSuffix">

type WithoutSnippets<T> = T extends unknown ? Omit<T, keyof Snippets> : never

export type RangeProps = WithoutSnippets<Base.RangeProps> &
  Snippets &
  Omit<SvelteHTMLElements["input"], keyof Base.RangeProps | keyof Snippets>
