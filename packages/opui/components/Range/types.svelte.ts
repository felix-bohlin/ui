import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.RangeSlots<Snippet>

export type RangeProps = Omit<Base.RangeProps, keyof Snippets> &
  Snippets &
  SvelteHTMLElements["input"]
