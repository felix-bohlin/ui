import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type SwitchProps = Base.SwitchProps &
  Base.SwitchSlots<Snippet> &
  SvelteHTMLElements["input"]
export type SwitchInputProps = Base.SwitchInputProps &
  SvelteHTMLElements["input"]
