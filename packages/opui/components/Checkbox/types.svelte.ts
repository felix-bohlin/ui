import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.CheckboxSlots<Snippet>

export type CheckboxProps = Omit<Base.CheckboxProps, keyof Snippets> &
  Snippets &
  Omit<SvelteHTMLElements["input"], "size">

export type CheckboxInputProps = Base.CheckboxInputProps &
  SvelteHTMLElements["input"]
