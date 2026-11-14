import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "endText"> &
  Base.Slots<Snippet> &
  Omit<
    SvelteHTMLElements["input"],
    "checked" | "group" | "role" | "size" | "type"
  > & { checked?: boolean; group?: (string | number)[] }

export type SwitchInputProps = Base.SwitchInputProps &
  Omit<
    SvelteHTMLElements["input"],
    "checked" | "children" | "group" | "role" | "type"
  > & { checked?: boolean; group?: (string | number)[] }
