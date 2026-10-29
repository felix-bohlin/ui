import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"li">

export type MessagesProps = Base.MessagesProps & HTMLAttributes<"ol">
