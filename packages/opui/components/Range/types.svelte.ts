import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Omit<Base.RangeSlots<Snippet>, "valueSuffix">

export type RangeProps = Omit<Base.RangeProps, keyof Snippets> &
  Snippets &
  Omit<SvelteHTMLElements["input"], keyof Base.RangeProps | keyof Snippets>
