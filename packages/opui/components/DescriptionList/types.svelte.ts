import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & SvelteHTMLElements["dl"]

export type DescriptionListDescriptionProps = SvelteHTMLElements["dd"]

export type DescriptionListItemProps = Base.DescriptionListItemProps &
  SvelteHTMLElements["div"]

export type DescriptionListTermProps = SvelteHTMLElements["dt"]
