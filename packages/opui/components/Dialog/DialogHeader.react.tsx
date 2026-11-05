"use client"

import { cx } from "../cx"
import Button from "../Button/Button.react"
import { useDialogContext } from "./context.react"
import { warnMissingId } from "../dev"
import { closePath } from "./icons"
import type { DialogHeaderProps as Props } from "./types.react"

export default function DialogHeader({
  className,
  closeLabel,
  children,
  closeIcon,
  ...rest
}: Props) {
  const dialog = useDialogContext()
  if (closeLabel) warnMissingId("Dialog", dialog?.id)

  return (
    <div className={cx(["ui-header", className])} {...rest}>
      {children}
      {closeLabel && (
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
