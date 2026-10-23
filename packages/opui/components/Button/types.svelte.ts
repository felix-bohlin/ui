import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props =
  | (Base.Props &
      Base.Slots<Snippet> & {
        as?: "button"
        href?: never
      } & SvelteHTMLElements["button"])
  | (Base.Props &
      Base.Slots<Snippet> & {
        as?: "a"
        href: string
      } & SvelteHTMLElements["a"])
