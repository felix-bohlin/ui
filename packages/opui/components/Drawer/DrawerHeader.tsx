import { splitProps, type JSX, Show } from "solid-js"
import IconButton from "../IconButton/IconButton"
import type { DrawerHeaderProps } from "./types.solid"

export default function DrawerHeader(props: DrawerHeaderProps) {
  const [local, rest] = splitProps(props, ["heading", "class", "children"])

  const closeDrawer = (event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement | null
    target?.closest("dialog")?.close()
  }

  return (
    <div class={`ui-header ${local.class || ""}`.trim()} {...rest}>
      <Show when={local.heading}>
        <span>{local.heading}</span>
      </Show>
      {local.children}
      <IconButton title="Close" onClick={closeDrawer}>
        <svg
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
      </IconButton>
    </div>
  )
}
