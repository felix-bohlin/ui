"use client"

import { cx } from "../cx"
import Button from "../Button/Button.react"
import { useDialogContext } from "./context.react"
import { warnMissingCloseTarget } from "../dev"
import { closePath } from "./icons"
import type { DialogHeaderProps as Props } from "./types.react"

export default function DialogHeader({
  className,
  closeButton,
  closeLabel = "Close",
  children,
  closeIcon,
  ...rest
}: Props) {
  const dialog = useDialogContext()
  if (closeButton) warnMissingCloseTarget("DialogHeader", dialog?.id, "Dialog")

  return (
    <div className={cx(["ui-header", className])} {...rest}>
      {children}
      {closeButton && (
        <Button
          aria-label={closeLabel}
          command="close"
          commandfor={dialog?.id}
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
