import { List, ListItem } from "opui-css/react"

export default function Variants() {
  return (
    <>
      <List>
        <ListItem label="Account" />
        <ListItem label="Billing" />
      </List>

      <List variant="tonal">
        <ListItem label="Language" />
        <ListItem label="Notifications" />
      </List>

      <List variant="transparent">
        <ListItem label="Accessibility" />
        <ListItem label="Privacy" />
      </List>
    </>
  )
}
