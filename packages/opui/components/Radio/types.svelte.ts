import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type RadioProps = Base.RadioProps & SvelteHTMLElements["input"]
export type RadioInputProps = Base.RadioInputProps &
  Omit<SvelteHTMLElements["input"], "type">
