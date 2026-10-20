import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  (
    | ({ as: "div" } & JSX.HTMLAttributes<HTMLDivElement>)
    | ({ as?: "fieldset" } & JSX.FieldsetHTMLAttributes<HTMLFieldSetElement>)
  )
