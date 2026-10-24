import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.Slots<Snippet>

type WithoutLabel<T> = T extends unknown ? Omit<T, "label"> : never

// prettier-ignore
export type Props = WithoutLabel<Base.Props> &
  Snippets &
  (
    | ({ as?: "a" } & Omit<SvelteHTMLElements["a"], "children">)
    | ({ as: "button" } & Omit<SvelteHTMLElements["button"], "children">)
    | ({ as?: "div" } & Omit<SvelteHTMLElements["div"], "children">)
  )
