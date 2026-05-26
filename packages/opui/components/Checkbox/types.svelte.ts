import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Actions = {
  useSelect?: boolean
  useSelectAll?: string
}

export type CheckboxProps = Base.CheckboxProps &
  Base.CheckboxSlots<Snippet> &
  Omit<SvelteHTMLElements["input"], "size"> &
  Actions

export type CheckboxInputProps = Base.CheckboxInputProps &
  SvelteHTMLElements["input"] &
  Actions
