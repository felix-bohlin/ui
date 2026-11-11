"use client"

import { useEffect, useRef, useState } from "react"
import { Button, Callout, CalloutContent, CalloutIcon } from "opui-css/react"

export default function Dismissible() {
  const [open, setOpen] = useState(true)
  const close = useRef<HTMLButtonElement>(null)
  const show = useRef<HTMLButtonElement>(null)
  const toggled = useRef(false)

  useEffect(() => {
    if (!toggled.current) return
    ;(open ? close : show).current?.focus()
  }, [open])

  function toggle(next: boolean) {
    toggled.current = true
    setOpen(next)
  }

  return open ? (
    <Callout id="callout-dismissible-1" severity="info">
      <CalloutIcon />
      <CalloutContent>
        The new editor is on for everyone. Your drafts from the old one are in
        Settings.
      </CalloutContent>
      <Button
        aria-label="Dismiss"
        onClick={() => toggle(false)}
        ref={close}
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
          <path
            fill="currentColor"
            d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"
          ></path>
        </svg>
      </Button>
    </Callout>
  ) : (
    <Button
      id="callout-dismissible-1-show"
      onClick={() => toggle(true)}
      ref={show}
      variant="outlined"
    >
      Show the callout again
    </Button>
  )
}
