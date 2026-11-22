import type * as Base from "./types"
import type { ComponentProps } from "@solidjs/web"

export type Props = Base.Props & ComponentProps<"div">

export type CardActionsProps = Base.CardActionsProps & ComponentProps<"div">

export type CardContentProps = Base.CardContentProps & ComponentProps<"div">

export type CardHeaderProps = Base.CardHeaderProps & ComponentProps<"hgroup">
