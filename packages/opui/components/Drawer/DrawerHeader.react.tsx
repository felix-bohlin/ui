"use client"

import Button from "../Button/Button.react"
import { cx } from "../cx"
import { useDrawerContext } from "./context.react"
import type { DrawerHeaderProps as Props } from "./types.react"

export default function DrawerHeader({
  children,
  className,
  closeLabel = "Close",
  commandfor,
  ...rest
}: Props) {
  const drawer = useDrawerContext()
  const closeProps =
    commandfor || drawer
      ? { command: "close", commandfor: commandfor ?? drawer?.id }
      : {
          onClick: (event: { currentTarget: HTMLElement }) =>
            event.currentTarget.closest("dialog")?.close(),
        }

  return (
    <div className={cx(["ui-header", className])} {...rest}>
      {children}
      <Button aria-label={closeLabel} rounded size="small" {...closeProps}>
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
