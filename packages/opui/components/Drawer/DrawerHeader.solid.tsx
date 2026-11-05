/** @jsxImportSource @solidjs/web */
import { children, omit, untrack } from "solid-js"
import Button from "../Button/Button.solid"
import { useDrawerContext } from "./context.solid"
import { warnMissingTarget } from "../dev"
import { closePath } from "./icons"
import type { DrawerHeaderProps as Props } from "./types.solid"

export default function DrawerHeader(props: Props) {
  const rest = omit(
    props,
    "class",
    "closeLabel",
    "commandfor",
    "children",
    "closeIcon",
  )
  const resolvedCloseIcon = children(() => props.closeIcon)
  const drawer = useDrawerContext()
  const closeLabel = () =>
    props.closeLabel === undefined ? "Close" : props.closeLabel
  const target = () => props.commandfor ?? drawer?.id
  untrack(() => {
    warnMissingTarget("DrawerHeader", target(), "Drawer")
  })

  return (
    <div class={["ui-header", props.class]} {...rest}>
      {props.children}
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
          >
            <path fill="currentColor" d={closePath} />
          </svg>
        ) : (
          resolvedCloseIcon()
        )}
      </Button>
    </div>
  )
}
