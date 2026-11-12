import { Callout, CalloutContent, CalloutIcon } from "opui-css/react"

export default function Dismissible() {
  return (
    <Callout closeLabel="Dismiss" dismissible severity="info">
      <CalloutIcon />
      <CalloutContent>
        The new editor is on for everyone. Your drafts from the old one are in
        Settings.
      </CalloutContent>
    </Callout>
  )
}
