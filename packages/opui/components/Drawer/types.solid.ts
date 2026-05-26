import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & Omit<JSX.DialogHtmlAttributes<HTMLDialogElement>, "id"> & {
  header?: JSX.Element
  content?: JSX.Element
  footer?: JSX.Element
}

export type DrawerHeaderProps = Base.DrawerHeaderProps & JSX.HTMLAttributes<HTMLDivElement> & {
  children?: JSX.Element
}

export type DrawerFooterProps = Base.DrawerFooterProps & JSX.HTMLAttributes<HTMLDivElement> & {
  children?: JSX.Element
}
