import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "description" | "label"> &
  Base.Slots<Snippet> &
  (
    | ({ as?: never; href?: never } & SvelteHTMLElements["li"])
    | ({ as?: "a"; href: string } & SvelteHTMLElements["a"])
    | ({ as: "button" } & SvelteHTMLElements["button"])
  )
