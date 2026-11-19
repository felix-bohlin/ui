import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"

export type Props = Base.Props &
  (
    | ({ as?: "div"; href?: never } & SvelteHTMLElements["div"])
    | ({ as: "button" } & SvelteHTMLElements["button"] & Base.Named)
    | ({ as?: "a" } & SvelteHTMLElements["a"] & Base.Named)
  )

export type AvatarGroupProps = Base.AvatarGroupProps & SvelteHTMLElements["div"]
