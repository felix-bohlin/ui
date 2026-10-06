import { merge, omit, onCleanup, Show, useContext } from "solid-js"
import Button from "../Button/Button"
import { DrawerContext } from "./context"
import type { DrawerHeaderProps } from "./types.solid"

export default function DrawerHeader(rawProps: DrawerHeaderProps) {
  const props = merge({ closeLabel: "Close" }, rawProps)
  const rest = omit(
    props,
    "children",
    "class",
    "closeLabel",
    "commandfor",
    "heading",
  )

  const drawer = useContext(DrawerContext)
  onCleanup(drawer.register(() => props.heading))

  return (
    <div class={["ui-header", props.class]} {...rest}>
      <Show when={props.heading}>
        <h2 id={drawer.headingId()}>{props.heading}</h2>
      </Show>
      {props.children}
      <Button
        aria-label={props.closeLabel}
        command={props.commandfor ? "close" : undefined}
        commandfor={props.commandfor}
        onClick={(event) => {
          if (!props.commandfor) event.currentTarget.closest("dialog")?.close()
        }}
        ripple
        rounded
        size="small"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
          ></path>
        </svg>
      </Button>
    </div>
  )
}
