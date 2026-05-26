import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.HTMLAttributes<any> & { as?: keyof JSX.IntrinsicElements }
