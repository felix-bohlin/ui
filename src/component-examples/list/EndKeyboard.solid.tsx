/** @jsxImportSource @solidjs/web */
import { List, ListItem } from "opui-css/solid"

export default function EndKeyboard() {
  return (
    <List>
      <ListItem end={<kbd>Ctrl+Shift+S</kbd>} label="Save all" />
      <ListItem end={<kbd>Ctrl+S</kbd>} label="Save" />
    </List>
  )
}
