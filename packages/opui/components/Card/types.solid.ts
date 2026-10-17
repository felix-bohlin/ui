import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.HTMLAttributes<HTMLDivElement>

export type CardActionsProps = Base.CardActionsProps &
  JSX.HTMLAttributes<HTMLDivElement>

export type CardContentProps = Base.CardContentProps &
  JSX.HTMLAttributes<HTMLDivElement>

export type CardHeaderProps = Base.CardHeaderProps &
  JSX.HTMLAttributes<HTMLElement>
