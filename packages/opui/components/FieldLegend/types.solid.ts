import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props & {
  as?: keyof JSX.IntrinsicElements
} & JSX.HTMLAttributes<HTMLElement>
