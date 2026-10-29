import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type TimelineItemSnippets = Base.TimelineItemSlots<Snippet>

export type Props = Base.Props & SvelteHTMLElements["ol"]

export type TimelineItemProps = Omit<
  Base.TimelineItemProps,
  keyof TimelineItemSnippets
> &
  TimelineItemSnippets &
  SvelteHTMLElements["li"]
