import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  JSX.DialogHtmlAttributes<HTMLDialogElement> & {
    closedby?: "any" | "none" | "closerequest"
  }

export type DialogActionsProps = Base.DialogActionsProps &
  JSX.HTMLAttributes<HTMLDivElement>

export type DialogContentProps = Base.DialogContentProps &
  JSX.HTMLAttributes<HTMLDivElement>

export type DialogHeaderProps = Base.DialogHeaderProps &
  JSX.HTMLAttributes<HTMLElement>
