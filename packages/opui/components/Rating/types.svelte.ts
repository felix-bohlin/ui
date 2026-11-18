import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  Omit<
    Omit<SvelteHTMLElements["fieldset"], "children"> &
      Omit<SvelteHTMLElements["meter"], "children">,
    keyof Base.Props
  >
