import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

type Actions = {
  useSelect?: boolean
}

export type RadioProps = Base.RadioProps & SvelteHTMLElements["input"] & Actions
export type RadioInputProps = Base.RadioInputProps &
  Omit<SvelteHTMLElements["input"], "type"> &
  Actions
