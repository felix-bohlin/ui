import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = Base.Props & SvelteHTMLElements["dialog"]

export type DrawerContentProps = Base.DrawerContentProps &
  SvelteHTMLElements["div"]

export type DrawerFooterProps = Base.DrawerFooterProps &
  SvelteHTMLElements["div"]

export type DrawerHeaderProps = Base.DrawerHeaderProps &
  Base.DrawerHeaderSlots<Snippet> &
  SvelteHTMLElements["div"]

export type DrawerTitleProps = Base.DrawerTitleProps & SvelteHTMLElements["h2"]
