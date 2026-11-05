/** @jsxImportSource @solidjs/web */
import { createUniqueId, omit } from "solid-js"
import { DialogContext } from "./context.solid"
import { autoLabelledBy, createIds } from "../id"
import type { Props } from "./types.solid"

export default function Dialog(props: Props) {
  const rest = omit(props, "class", "closedby", "children")
  const uid = createUniqueId()
  const titleId = () => createIds(uid, "dialog", rest.id)("title")
  const labelledBy = () => autoLabelledBy(rest, titleId())

  return (
    <DialogContext
      value={{
        get titleId() {
          return labelledBy()
        },
      }}
    >
      <dialog
        aria-labelledby={labelledBy()}
        class={["ui-dialog", "ui-elevated", props.class]}
        closedby={props.closedby}
        {...rest}
      >
        {props.children}
      </dialog>
    </DialogContext>
  )
}
