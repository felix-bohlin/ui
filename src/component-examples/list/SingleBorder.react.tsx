import { List, ListItem } from "opui-css/react"

export default function SingleBorder() {
  return (
    <List>
      <ListItem label="Account" />
      <ListItem label="Settings" />
      <ListItem borderTop label="Sign out" />
    </List>
  )
}
