import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.Slots<Snippet>

// prettier-ignore
export type Props = Base.Props &
  Snippets &
  (
    | ({ as?: "a" } & SvelteHTMLElements["a"])
    | ({ as?: "button" } & SvelteHTMLElements["button"])
    | ({ as?: "div" } & SvelteHTMLElements["div"])
  )
