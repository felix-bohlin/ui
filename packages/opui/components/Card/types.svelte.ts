import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & SvelteHTMLElements["div"]

export type CardActionsProps = Base.CardActionsProps & SvelteHTMLElements["div"]

export type CardContentProps = Base.CardContentProps & SvelteHTMLElements["div"]

export type CardHeaderProps = Base.CardHeaderProps &
  SvelteHTMLElements["hgroup"]
