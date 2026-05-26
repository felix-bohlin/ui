import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.DialogHtmlAttributes<HTMLDialogElement> & {
  actions?: JSX.Element
  content?: JSX.Element
  header?: JSX.Element
  closedby?: "any" | "none" | "closerequest"
}
