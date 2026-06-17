import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  Partial<Base.Slots<JSX.Element>> &
  JSX.DialogHtmlAttributes<HTMLDialogElement> & {
    closedby?: "any" | "none" | "closerequest"
  }
