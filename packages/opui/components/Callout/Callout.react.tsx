"use client"

import { type HTMLAttributes, useEffect, useId, useMemo } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { useHydrated, useListener } from "../react"
import Button from "../Button/Button.react"
import { CalloutContext } from "./context.react"
import type { Props } from "./types.react"
import type { Context } from "./types"

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
  const rootRef = useHydrated(useListener(ref, "dismiss", onDismiss))
  useEffect(() => {
    void import("../../elements/callout.js")
  }, [])
  const attrs = defined(rest as HTMLAttributes<HTMLElement>)
  const context = useMemo<Context>(() => ({ severity }), [severity])

  return (
    <CalloutContext value={context}>
      <Root
        className={cx([
          "ui-callout",
          severity && `ui-${severity}`,
          variant && variant !== "tonal" && `ui-${variant}`,
          className,
        ])}
        id={rootId}
        role={closeButton ? "article" : undefined}
        data-hydrating={Root.includes("-") ? "" : undefined}
        ref={rootRef}
        {...attrs}
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
              />
            ) : (
              closeIcon
            )}
          </Button>
        )}
      </Root>
    </CalloutContext>
  )
}
