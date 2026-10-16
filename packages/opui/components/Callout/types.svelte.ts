import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & SvelteHTMLElements["article"]

export type CalloutContentProps = Base.CalloutContentProps &
  SvelteHTMLElements["div"]

export type CalloutIconProps = Base.CalloutIconProps & SvelteHTMLElements["svg"]
