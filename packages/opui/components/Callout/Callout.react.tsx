"use client"

import { useEffect, useId } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { useListener } from "../react"
import Button from "../Button/Button.react"
import { CalloutContext } from "./context.react"
import { closePath } from "./icons"
import type { Props } from "./types.react"

export default function Callout({
  className,
  closeButton,
  closeLabel = "Close",
  id,
  onDismiss,
  ref,
  severity,
  variant,
  children,
  closeIcon,
  ...rest
}: Props) {
  const uid = useId()
  const base = id || `callout-${uid}`
  const Root = closeButton ? "opui-callout" : "article"
  const rootId = closeButton ? base : id
  const rootRef = useListener(ref, "dismiss", onDismiss)
  useEffect(() => {
    void import("../../elements/callout.js")
  }, [])

  return (
    <CalloutContext value={{ severity }}>
      <Root
        className={cx([
          "ui-callout",
          severity && `ui-${severity}`,
          variant && variant !== "tonal" && `ui-${variant}`,
          className,
        ])}
        id={rootId}
        role={closeButton ? "article" : undefined}
        ref={rootRef}
        {...defined(rest as object)}
      >
        {children}
        {closeButton && (
          <Button
            aria-label={closeLabel}
            command="--dismiss"
            commandfor={rootId}
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
      </Root>
    </CalloutContext>
  )
}
