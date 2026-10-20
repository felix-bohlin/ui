"use client"

import Button from "../Button/Button.react"
import { cx } from "../cx"
import { useDrawerContext } from "./context.react"
import { closePath } from "./icons"
import type { DrawerHeaderProps as Props } from "./types.react"

export default function DrawerHeader({
  className,
  closeLabel = "Close",
  commandfor,
  children,
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
      <Button aria-label={closeLabel} round size="small" {...closeProps}>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path fill="currentColor" d={closePath}></path>
        </svg>
      </Button>
    </div>
  )
}
