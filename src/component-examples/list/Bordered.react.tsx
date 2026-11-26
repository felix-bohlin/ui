import { List, ListItem } from "opui-css/react"

export default function Bordered() {
  return (
    <List bordered>
      <ListItem label="Billing" />
      <ListItem label="Notifications" />
      <ListItem label="Security" />
    </List>
  )
}
