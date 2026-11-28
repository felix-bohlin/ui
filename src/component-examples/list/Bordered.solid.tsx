/** @jsxImportSource @solidjs/web */
import { List, ListItem } from "opui-css/solid"

export default function Bordered() {
  return (
    <List bordered>
      <ListItem label="Bassbook Gold" />
      <ListItem label="Notifications" />
      <ListItem label="Security" />
    </List>
  )
}
