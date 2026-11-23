import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.RadioSlots<Snippet>

export type RadioInputProps = Base.RadioInputProps &
  Omit<SvelteHTMLElements["input"], "type">

export type RadioProps = Omit<Base.RadioProps, keyof Snippets> &
  Snippets &
  Omit<SvelteHTMLElements["input"], "size">
