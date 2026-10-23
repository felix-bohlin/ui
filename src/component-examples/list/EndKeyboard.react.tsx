import { List, ListItem } from "opui-css/react"

export default function EndKeyboard() {
  return (
    <List>
      <ListItem label="Save all" end={<kbd>Ctrl+Shift+S</kbd>} />
      <ListItem label="Save" end={<kbd>Ctrl+S</kbd>} />
    </List>
  )
}
