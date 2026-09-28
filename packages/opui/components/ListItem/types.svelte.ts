import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

// prettier-ignore
export type Props =
  Omit<Base.Props, keyof Base.Slots<Snippet>> &
  Base.Slots<Snippet> &
  (
    | ({ as?: "li" } & SvelteHTMLElements["li"])
    | ({ as: "a" } & SvelteHTMLElements["a"])
    | ({ as: "button" } & SvelteHTMLElements["button"])
    | ({ as: "div" } & SvelteHTMLElements["div"])
  )
