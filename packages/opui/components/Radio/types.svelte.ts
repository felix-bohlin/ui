import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.RadioSlots<Snippet>

type Group = { group?: string | number | boolean }

export type RadioInputProps = Base.RadioInputProps &
  Group &
  Omit<SvelteHTMLElements["input"], "group" | "type"> & {
    ref?: HTMLInputElement | null
  }

export type RadioProps = Omit<Base.RadioProps, keyof Snippets> &
  Snippets &
  Group &
  Omit<SvelteHTMLElements["input"], "group" | "size"> & {
    ref?: HTMLLabelElement | null
  }
