/** @jsxImportSource @solidjs/web */
import { List, ListItem } from "opui-css/solid"

export default function SingleBorder() {
  return (
    <List>
      <ListItem label="Account" />
      <ListItem label="Settings" />
      <ListItem borderTop label="Sign out" />
    </List>
  )
}
