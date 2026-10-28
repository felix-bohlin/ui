import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  Omit<
    SvelteHTMLElements["fieldset"] & SvelteHTMLElements["meter"],
    keyof Base.Props
  >
