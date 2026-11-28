"use client"

import { cx } from "../cx"
import Button from "../Button/Button.react"
import { useDialogContext } from "./context.react"
import { DEV, warnMissingCloseTarget } from "../dev"
import type { DialogHeaderProps as Props } from "./types.react"

export default function DialogHeader({
  className,
  closeButton,
  closeLabel = "Close",
  commandfor,
  children,
  closeIcon,
  ...rest
}: Props) {
  const dialog = useDialogContext()
  const target = commandfor ?? dialog?.id
  if (DEV && closeButton)
    warnMissingCloseTarget("DialogHeader", target, "Dialog")

  return (
    <div className={cx(["ui-header", className])} {...rest}>
      {children}
      {closeButton && (
        <Button
          aria-label={closeLabel}
          command="close"
          commandfor={target}
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
            />
          ) : (
            closeIcon
          )}
        </Button>
      )}
    </div>
  )
}
