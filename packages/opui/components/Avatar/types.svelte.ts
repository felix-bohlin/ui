import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = Base.Props &
  Base.Slots<Snippet> &
  (
    | ({ as?: "div" } & SvelteHTMLElements["div"])
    | ({ as?: "button" } & SvelteHTMLElements["button"])
    | ({ as?: "a" } & SvelteHTMLElements["a"])
  )
