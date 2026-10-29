import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  Omit<SvelteHTMLElements["opui-toaster"], "children" | "duration" | "id">
