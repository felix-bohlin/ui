/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import { useDialogContext } from "./context.solid"
import { warnReplacedId } from "../dev"
import type { DialogTitleProps as Props } from "./types.solid"

export default function DialogTitle(props: Props) {
  const rest = omit(props, "class", "id", "children")
  const dialog = useDialogContext()
  untrack(() => {
    warnReplacedId("DialogTitle", "Dialog", props.id, dialog?.titleId)
  })

  return (
    <h2 class={[props.class]} id={dialog?.titleId ?? props.id} {...rest}>
      {props.children}
    </h2>
  )
}
