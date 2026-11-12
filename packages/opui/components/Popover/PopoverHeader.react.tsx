"use client"

import { cx } from "../cx"
import Button from "../Button/Button.react"
import { usePopoverContext } from "./context.react"
import { warnMissingCloseTarget } from "../dev"
import { closePath } from "./icons"
import type { PopoverHeaderProps as Props } from "./types.react"

export default function PopoverHeader({
  className,
  closeLabel,
  children,
  closeIcon,
  ...rest
}: Props) {
  const popover = usePopoverContext()
  if (closeLabel)
    warnMissingCloseTarget("PopoverHeader", popover?.id, "Popover")

  return (
    <div className={cx(["ui-header", className])} {...rest}>
      {children}
      {closeLabel && (
        <Button
          aria-label={closeLabel}
          command="hide-popover"
          commandfor={popover?.id}
          round
          size="small"
        >
          {closeIcon === undefined ? (
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
            closeIcon
          )}
        </Button>
      )}
    </div>
  )
}
