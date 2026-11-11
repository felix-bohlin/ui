import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = Base.Props &
  Omit<SvelteHTMLElements["div"], "id" | "popover">

export type PopoverContentProps = Base.PopoverContentProps &
  SvelteHTMLElements["div"]

export type PopoverFooterProps = Base.PopoverFooterProps &
  SvelteHTMLElements["div"]

export type PopoverHeaderProps = Base.PopoverHeaderProps &
  Base.PopoverHeaderSlots<Snippet> &
  SvelteHTMLElements["div"]

export type PopoverTitleProps = Base.PopoverTitleProps &
  SvelteHTMLElements["h2"]
