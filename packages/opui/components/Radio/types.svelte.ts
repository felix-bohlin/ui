import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "endText"> &
  Base.Slots<Snippet> &
  Omit<SvelteHTMLElements["input"], "group" | "size" | "type"> & {
    group?: string | number | boolean
  }

export type RadioInputProps = Base.RadioInputProps &
  Omit<SvelteHTMLElements["input"], "children" | "group" | "type"> & {
    group?: string | number | boolean
  }
