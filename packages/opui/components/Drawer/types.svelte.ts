import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Snippets = Base.Slots<Snippet>

export type Props = Base.Props &
  Omit<SvelteHTMLElements["dialog"], "id"> &
  Snippets

export type DrawerFooterProps = Base.DrawerFooterProps & SvelteHTMLElements["div"]

export type DrawerHeaderProps = Base.DrawerHeaderProps & SvelteHTMLElements["div"]
