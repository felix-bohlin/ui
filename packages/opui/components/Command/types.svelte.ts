import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = Base.Props &
  Omit<SvelteHTMLElements["opui-command"], "filter">

export type CommandGroupProps = Omit<Base.CommandGroupProps, "label"> &
  Base.CommandGroupSlots<Snippet> &
  SvelteHTMLElements["div"]

export type CommandInputProps = Base.CommandInputProps &
  Base.CommandInputName &
  SvelteHTMLElements["input"]

export type CommandListProps = Base.CommandListProps & SvelteHTMLElements["div"]
