import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Group = { group?: (string | number)[] }

export type SwitchProps = Base.SwitchProps &
  Base.SwitchSlots<Snippet> &
  Group &
  Omit<SvelteHTMLElements["input"], "size">
export type SwitchInputProps = Base.SwitchInputProps &
  Group &
  SvelteHTMLElements["input"]
