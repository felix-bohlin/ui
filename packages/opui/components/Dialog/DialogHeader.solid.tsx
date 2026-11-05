/** @jsxImportSource @solidjs/web */
import { children, omit, untrack } from "solid-js"
import Button from "../Button/Button.solid"
import { useDialogContext } from "./context.solid"
import { warnMissingCloseTarget } from "../dev"
import { closePath } from "./icons"
import type { DialogHeaderProps as Props } from "./types.solid"

export default function DialogHeader(props: Props) {
  const rest = omit(props, "class", "closeLabel", "children", "closeIcon")
  const resolvedCloseIcon = children(() => props.closeIcon)
  const dialog = useDialogContext()
  untrack(() => {
    if (props.closeLabel)
      warnMissingCloseTarget("DialogHeader", dialog?.id, "Dialog")
  })

  return (
    <div class={["ui-header", props.class]} {...rest}>
      {props.children}
      {props.closeLabel && (
        <Button
          aria-label={props.closeLabel}
          command="close"
          commandfor={dialog?.id}
          round
          size="small"
        >
          {resolvedCloseIcon() === undefined ? (
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <path fill="currentColor" d={closePath} />
            </svg>
          ) : (
            resolvedCloseIcon()
          )}
        </Button>
      )}
    </div>
  )
}
