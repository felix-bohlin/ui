import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  Omit<SvelteHTMLElements["dialog"], "closedby" | "id">

export type DrawerContentProps = Base.DrawerContentProps &
  SvelteHTMLElements["div"]

export type DrawerFooterProps = Base.DrawerFooterProps &
  SvelteHTMLElements["div"]

export type DrawerHeaderProps = Base.DrawerHeaderProps &
  SvelteHTMLElements["div"]

export type DrawerTitleProps = Base.DrawerTitleProps & SvelteHTMLElements["h2"]
