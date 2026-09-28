import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  SvelteHTMLElements["dl"] & {
    ref?: HTMLDListElement | null
  }

export type TermProps = Base.Props &
  SvelteHTMLElements["dt"] & {
    ref?: HTMLElement | null
  }

export type DescriptionProps = Base.Props &
  SvelteHTMLElements["dd"] & {
    ref?: HTMLElement | null
  }

export type ItemProps = Base.Props &
  SvelteHTMLElements["div"] & {
    ref?: HTMLDivElement | null
  }
