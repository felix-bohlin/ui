import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.Slots<Snippet> & {
  valueText?: Snippet<[number]>
}

export type Props = Omit<Base.Props, keyof Snippets> &
  Snippets &
  Omit<
    SvelteHTMLElements["input"],
    keyof Base.Props | keyof Snippets | "children"
  >
