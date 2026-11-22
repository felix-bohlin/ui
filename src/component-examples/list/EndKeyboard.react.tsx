import { List, ListItem } from "opui-css/react"

export default function EndKeyboard() {
  return (
    <List>
      <ListItem end={<kbd>Ctrl+S</kbd>} label="Save" />
      <ListItem end={<kbd>Ctrl+Shift+S</kbd>} label="Save all" />
    </List>
  )
}
