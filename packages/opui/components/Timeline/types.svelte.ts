import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Base.Props & SvelteHTMLElements["ol"]

export type TimelineItemProps = Without<Base.TimelineItemProps, "label"> &
  Base.TimelineItemSlots<Snippet> &
  SvelteHTMLElements["li"]
