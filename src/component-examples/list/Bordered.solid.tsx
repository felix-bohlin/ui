/** @jsxImportSource @solidjs/web */
import { List, ListItem } from "opui-css/solid"

export default function Bordered() {
  return (
    <List bordered>
      <ListItem label="So" />
      <ListItem label="Many" />
      <ListItem label="Borders" />
    </List>
  )
}
