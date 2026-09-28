import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props &
  Base.Slots<JSX.Element> &
  Omit<JSX.DialogHtmlAttributes<HTMLDialogElement>, "closedby" | "id">

export type DrawerFooterProps = Base.DrawerFooterProps &
  JSX.HTMLAttributes<HTMLDivElement>

export type DrawerHeaderProps = Base.DrawerHeaderProps &
  JSX.HTMLAttributes<HTMLDivElement>
