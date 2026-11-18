import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "label"> &
  Base.Slots<Snippet> &
  (
    | ({ as?: "a" } & Omit<SvelteHTMLElements["a"], "children">)
    | ({ as: "button" } & Omit<SvelteHTMLElements["button"], "children">)
    | ({ as?: "div" } & Omit<SvelteHTMLElements["div"], "children">)
    | ({ as: "span" } & Omit<SvelteHTMLElements["span"], "children">)
  )
