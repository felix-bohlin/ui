import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type StepperItemSnippets = Base.StepperItemSlots<Snippet>

export type Props = Base.Props & SvelteHTMLElements["ol"]

export type StepperItemProps = Omit<
  Base.StepperItemProps,
  keyof StepperItemSnippets
> &
  StepperItemSnippets &
  SvelteHTMLElements["li"]
