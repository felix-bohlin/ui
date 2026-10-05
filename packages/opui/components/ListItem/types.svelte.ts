import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

// prettier-ignore
export type Props =
  Base.Props &
  Base.Slots<Snippet> &
  (
    | ({ as?: never; href?: never } & SvelteHTMLElements["li"])
    | ({ as?: "a"; href: string } & SvelteHTMLElements["a"])
    | ({ as: "button" } & SvelteHTMLElements["button"])
    | ({ as: "div" } & SvelteHTMLElements["div"])
  )
