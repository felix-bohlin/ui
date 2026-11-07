import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = Base.Props & SvelteHTMLElements["dialog"]

export type DialogContentProps = Base.DialogContentProps &
  SvelteHTMLElements["div"]

export type DialogFooterProps = Base.DialogFooterProps &
  SvelteHTMLElements["div"]

export type DialogHeaderProps = Base.DialogHeaderProps &
  Base.DialogHeaderSlots<Snippet> &
  SvelteHTMLElements["div"]

export type DialogTitleProps = Base.DialogTitleProps & SvelteHTMLElements["h2"]
