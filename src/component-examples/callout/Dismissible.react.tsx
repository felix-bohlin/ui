"use client"

import { Callout, CalloutContent, CalloutIcon } from "opui-css/react"

export default function Dismissible() {
  return (
    <Callout
      closeButton
      closeLabel="Dismiss"
      onDismiss={(event) => {
        if (!confirm("Hide this message?")) event.preventDefault()
      }}
      severity="info"
    >
      <CalloutIcon />
      <CalloutContent>
        The new editor is on for everyone. Your drafts from the old one are in
        Settings.
      </CalloutContent>
    </Callout>
  )
}
