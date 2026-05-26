import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { FieldGroupContext } from "../FieldGroup/context.svelte"
import type { Snippet } from "svelte"

type Slots = {
  children?: Snippet<[FieldGroupContext]>
}

export type Props = Base.Props & SvelteHTMLElements["div"] & Slots
