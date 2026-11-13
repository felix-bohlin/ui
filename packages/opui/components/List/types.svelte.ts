import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  (
    | ({ as: "ol" } & SvelteHTMLElements["ol"])
    | ({ as?: "ul" } & SvelteHTMLElements["ul"])
  )
