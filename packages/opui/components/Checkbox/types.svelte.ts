import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

type Group = { group?: (string | number)[] }

export type CheckboxProps = Base.CheckboxProps & SvelteHTMLElements["label"]

export type CheckboxInputProps = Base.CheckboxInputProps &
  Group &
  SvelteHTMLElements["input"]
