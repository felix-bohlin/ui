import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props &
  (
    | ({ as?: "fieldset" } & JSX.FieldsetHTMLAttributes<HTMLFieldSetElement>)
    | ({ as: "div" } & JSX.HTMLAttributes<HTMLDivElement>)
  )
