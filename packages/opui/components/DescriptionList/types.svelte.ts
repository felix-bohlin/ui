import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props & SvelteHTMLElements["dl"]

export type TermProps = SvelteHTMLElements["dt"]

export type DescriptionProps = SvelteHTMLElements["dd"]

export type ItemProps = SvelteHTMLElements["div"]
