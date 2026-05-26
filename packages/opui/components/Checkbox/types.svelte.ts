import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type CheckboxProps = Base.CheckboxProps &
  Base.CheckboxSlots<Snippet> &
  Omit<SvelteHTMLElements["input"], "size">

export type CheckboxInputProps = Base.CheckboxInputProps &
  SvelteHTMLElements["input"]
