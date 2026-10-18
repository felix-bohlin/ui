import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.CheckboxSlots<Snippet>

type Group = { group?: (string | number)[] }

export type CheckboxProps = Omit<Base.CheckboxProps, keyof Snippets> &
  Snippets &
  Group &
  Omit<SvelteHTMLElements["input"], "size" | "type">

export type CheckboxInputProps = Base.CheckboxInputProps &
  Group &
  Omit<SvelteHTMLElements["input"], "type">
