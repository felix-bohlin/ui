import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & SvelteHTMLElements["label"]

export type TextFieldInputProps = Base.TextFieldInputProps & {
  // Add 'numeric' as valid input type
  type?: SvelteHTMLElements["input"]["type"] | "numeric"
} & Omit<SvelteHTMLElements["input"], "type">
