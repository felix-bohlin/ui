import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props =
  | (Base.Props & {
      as?: "button"
      href?: never
    } & SvelteHTMLElements["button"])
  | (Base.Props & { as?: "a"; href: string } & SvelteHTMLElements["a"])
