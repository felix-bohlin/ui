import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = Base.Props &
  Base.Slots<Snippet> & {
    ondismiss?: (event: Base.Events["dismiss"]) => void
  } & SvelteHTMLElements["article"]

export type CalloutActionsProps = Base.CalloutActionsProps &
  SvelteHTMLElements["div"]

export type CalloutContentProps = Base.CalloutContentProps &
  SvelteHTMLElements["div"]

export type CalloutIconProps = Base.CalloutIconProps &
  Omit<
    SvelteHTMLElements["svg"],
    "aria-hidden" | "children" | "height" | "viewBox" | "width" | "xmlns"
  >
