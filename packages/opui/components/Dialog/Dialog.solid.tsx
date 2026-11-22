/** @jsxImportSource @solidjs/web */
import { createUniqueId, omit } from "solid-js"
import { defined } from "../attrs"
import { DialogContext } from "./context.solid"
import { autoLabelledBy } from "../id"
import type { Props } from "./types.solid"

export default function Dialog(props: Props) {
  const rest = omit(props, "class", "closedby", "children")
  const uid = createUniqueId()
  const titleId = () => `${rest.id || `dialog-${uid}`}-title`
  const labelledBy = () => autoLabelledBy(rest, titleId())

  return (
    <DialogContext
      value={{
        get id() {
          return rest.id || undefined
        },
        get titleId() {
          return labelledBy()
        },
      }}
    >
      <dialog
        aria-labelledby={labelledBy()}
        class={["ui-dialog", "ui-elevated", props.class]}
        closedby={props.closedby}
        {...defined(rest)}
      >
        {props.children}
      </dialog>
    </DialogContext>
  )
}
