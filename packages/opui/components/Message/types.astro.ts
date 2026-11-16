import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"li">

export type MessageListProps = Base.MessageListProps & HTMLAttributes<"ol">
