import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.SwitchSlots<Snippet>

type Group = { group?: (string | number)[] }

export type SwitchProps = Omit<Base.SwitchProps, keyof Snippets> &
  Snippets &
  Group &
  Omit<SvelteHTMLElements["input"], "size" | "type">

export type SwitchInputProps = Base.SwitchInputProps &
  Group &
  Omit<SvelteHTMLElements["input"], "type">
