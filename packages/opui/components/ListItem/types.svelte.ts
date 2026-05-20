import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type CommonProps = {
  end?: Snippet
  start?: Snippet
  text?: Snippet
}

// prettier-ignore
export type Props =
  | (Base.Props & CommonProps & { as?: never, href?: never } & SvelteHTMLElements["li"])
  | (Base.Props & CommonProps & { as?: "a", href: string } & SvelteHTMLElements["a"])
  | (Base.Props & CommonProps & { as?: "button", href?: never } & SvelteHTMLElements["button"])
  | (Base.Props & CommonProps & { as?: "div", href?: never } & SvelteHTMLElements["div"])
