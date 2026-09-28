import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & SvelteHTMLElements["dl"]

export type TermProps = Base.Props & SvelteHTMLElements["dt"]

export type DescriptionProps = Base.Props & SvelteHTMLElements["dd"]

export type ItemProps = Base.Props & SvelteHTMLElements["div"]
