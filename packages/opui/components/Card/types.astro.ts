import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"div">

export type CardActionsProps = Base.CardActionsProps & HTMLAttributes<"div">

export type CardContentProps = Base.CardContentProps & HTMLAttributes<"div">

export type CardHeaderProps = Base.CardHeaderProps & HTMLAttributes<"hgroup">
