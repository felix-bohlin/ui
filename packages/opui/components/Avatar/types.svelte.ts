import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  (
    | ({ as?: "div" } & SvelteHTMLElements["div"])
    | ({ as: "button" } & SvelteHTMLElements["button"])
    | ({ as?: "a" } & SvelteHTMLElements["a"])
  )

export type AvatarGroupProps = Base.AvatarGroupProps & SvelteHTMLElements["div"]
