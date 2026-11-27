import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = Base.Props & Base.Slots<Snippet> & SvelteHTMLElements["nav"]

export type BreadcrumbItemProps = Base.BreadcrumbItemProps &
  Base.BreadcrumbItemSlots<Snippet> &
  SvelteHTMLElements["li"]
