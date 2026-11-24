import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props =
  | (Base.Props & { name: string } & Omit<
        SvelteHTMLElements["fieldset"],
        "children" | keyof Base.Props
      >)
  | (Base.Props & { name?: undefined } & Omit<
        SvelteHTMLElements["meter"],
        "children" | keyof Base.Props
      >)
