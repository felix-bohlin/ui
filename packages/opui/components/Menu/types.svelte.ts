import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type MenuItem = Base.MenuItem &
  Omit<
    SvelteHTMLElements["a"] & SvelteHTMLElements["button"],
    keyof Base.MenuItem | "children"
  >

export type Props = Omit<Base.Props, "items"> & {
  items?: MenuItem[]
} & Omit<SvelteHTMLElements["menu"], "id" | "popover">
