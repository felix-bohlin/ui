import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type MenuItem = Base.MenuItem &
  Omit<
    SvelteHTMLElements["a"] & SvelteHTMLElements["button"],
    keyof Base.MenuItem | "children"
  >

export type Props = Omit<Base.Props, "items"> &
  Base.Slots<Snippet> & {
    items?: MenuItem[]
  } & Omit<SvelteHTMLElements["menu"], "id" | "popover">
