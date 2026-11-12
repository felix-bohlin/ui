"use client"

import { useEffect, useId } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import Button from "../Button/Button.react"
import { CalloutContext } from "./context.react"
import { closePath } from "./icons"
import type { Props } from "./types.react"

export default function Callout({
  className,
  closeLabel = "Close",
  dismissible,
  id,
  severity,
  variant,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const base = id || `callout-${uid}`
  const Root = dismissible ? "opui-callout" : "article"
  const rootId = dismissible ? base : id
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
        role={dismissible ? "article" : undefined}
        {...defined(rest as object)}
      >
        {children}
        {dismissible && (
          <Button
            aria-label={closeLabel}
            command="--dismiss"
            commandfor={rootId}
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
        )}
      </Root>
    </CalloutContext>
  )
}
