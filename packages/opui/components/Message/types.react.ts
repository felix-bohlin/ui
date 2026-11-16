import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props = Base.Props & Base.Slots<ReactNode> & ComponentProps<"li">

export type MessageListProps = Base.MessageListProps & ComponentProps<"ol">
