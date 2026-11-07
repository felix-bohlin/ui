import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Base.Props & SvelteHTMLElements["ol"]

export type StepperItemProps = Without<
  Base.StepperItemProps,
  "description" | "label"
> &
  Base.StepperItemSlots<Snippet> &
  Omit<SvelteHTMLElements["li"], "children">
