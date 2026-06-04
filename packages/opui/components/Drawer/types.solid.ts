import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  Omit<JSX.DialogHtmlAttributes<HTMLDialogElement>, "id"> &
  Partial<Base.Slots<JSX.Element>>

export type DrawerFooterProps = Base.DrawerFooterProps &
  JSX.HTMLAttributes<HTMLDivElement>

export type DrawerHeaderProps = Base.DrawerHeaderProps &
  JSX.HTMLAttributes<HTMLDivElement>
