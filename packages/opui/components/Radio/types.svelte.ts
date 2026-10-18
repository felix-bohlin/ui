import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.Slots<Snippet>

type Group = { group?: string | number | boolean }

export type Props = Omit<Base.Props, keyof Snippets> &
  Snippets &
  Group &
  Omit<SvelteHTMLElements["input"], "size" | "type">

export type RadioInputProps = Base.RadioInputProps &
  Group &
  Omit<SvelteHTMLElements["input"], "type">
