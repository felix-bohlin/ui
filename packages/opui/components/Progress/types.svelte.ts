import type { SvelteHTMLElements } from "svelte/elements"
import type * as Base from "./types"

export type Props = Base.Props & SvelteHTMLElements["progress"]
