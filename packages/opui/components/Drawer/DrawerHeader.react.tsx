"use client"

import { cx } from "../cx"
import Button from "../Button/Button.react"
import { useDrawerContext } from "./context.react"
import { warnMissingTarget } from "../dev"
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
  const target = commandfor ?? drawer?.id
  warnMissingTarget("DrawerHeader", target, "Drawer")

  return (
    <div className={cx(["ui-header", className])} {...rest}>
      {children}
      <Button
        aria-label={closeLabel}
        command="close"
        commandfor={target}
        round
        size="small"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path fill="currentColor" d={closePath} />
        </svg>
      </Button>
    </div>
  )
}
