import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Omit<Base.RangeSlots<Snippet>, "valueSuffix">

export type RangeProps = Omit<Base.RangeProps, keyof Snippets> &
  Pick<Base.RangeProps, "valueSuffix"> &
  Snippets &
  SvelteHTMLElements["input"]
