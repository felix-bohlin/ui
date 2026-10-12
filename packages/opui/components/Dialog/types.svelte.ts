import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & SvelteHTMLElements["dialog"]

export type DialogActionsProps = Base.DialogActionsProps &
  SvelteHTMLElements["div"]

export type DialogContentProps = Base.DialogContentProps &
  SvelteHTMLElements["div"]

export type DialogHeaderProps = Base.DialogHeaderProps &
  SvelteHTMLElements["hgroup"]
