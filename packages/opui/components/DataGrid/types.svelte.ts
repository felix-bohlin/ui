import type * as Base from "./types"
import type { SvelteHTMLElements } from "svelte/elements"
import type { Snippet } from "svelte"

export type Props = Base.Props &
  Omit<SvelteHTMLElements["div"], "children"> & {
    actions?: Snippet
    cells?: Record<
      string,
      Snippet<[Base.DataGridRow, Base.DataGridColumn & { position: number }]>
    >
    detail?: Snippet<[Base.DataGridRow]>
    empty?: Snippet
  }
