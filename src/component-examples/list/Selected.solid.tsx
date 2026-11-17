/** @jsxImportSource @solidjs/web */
import { List, ListItem } from "opui-css/solid"

export default function Selected() {
  return (
    <List>
      <ListItem
        aria-current="page"
        description="12 unread"
        href="#selected"
        label="Inbox"
      />
      <ListItem href="#selected" label="Sent" />
    </List>
  )
}
