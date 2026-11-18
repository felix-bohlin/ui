import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & {
  onreaction?: (event: Base.Events["reaction"]) => void
} & Omit<SvelteHTMLElements["opui-reactions"], "onreaction">
