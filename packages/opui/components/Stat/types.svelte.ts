import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.Slots<Snippet>

export type Props = Omit<Base.Props, keyof Snippets> &
  Snippets &
  SvelteHTMLElements["dl"]
