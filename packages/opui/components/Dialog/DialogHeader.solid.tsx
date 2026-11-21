/** @jsxImportSource @solidjs/web */
import { children, omit, untrack } from "solid-js"
import Button from "../Button/Button.solid"
import { useDialogContext } from "./context.solid"
import { warnMissingCloseTarget } from "../dev"
import type { DialogHeaderProps as Props } from "./types.solid"

export default function DialogHeader(props: Props) {
  const rest = omit(
    props,
    "class",
    "closeButton",
    "closeLabel",
    "commandfor",
    "children",
    "closeIcon",
  )
  const resolvedCloseIcon = children(() => props.closeIcon)
  const dialog = useDialogContext()
  const closeLabel = () =>
    props.closeLabel === undefined ? "Close" : props.closeLabel
  const target = () => props.commandfor ?? dialog?.id
  untrack(() => {
    if (props.closeButton)
      warnMissingCloseTarget("DialogHeader", target(), "Dialog")
  })

  return (
    <div class={["ui-header", props.class]} {...rest}>
      {props.children}
      {props.closeButton && (
        <Button
          aria-label={closeLabel()}
          command="close"
          commandfor={target()}
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
            />
          ) : (
            resolvedCloseIcon()
          )}
        </Button>
      )}
    </div>
  )
}
