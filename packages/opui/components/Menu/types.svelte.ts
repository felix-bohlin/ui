import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type MenuItem =
  | (Base.MenuItem & { href?: undefined } & Omit<
        SvelteHTMLElements["button"],
        "children" | keyof Base.MenuItem
      >)
  | (Base.MenuItem & { href: string } & Omit<
        SvelteHTMLElements["a"],
        "children" | keyof Base.MenuItem
      >)

export type Props = Omit<Base.Props, "items"> &
  Base.Slots<Snippet> & {
    items?: MenuItem[]
  } & Omit<SvelteHTMLElements["menu"], "id" | "popover">
