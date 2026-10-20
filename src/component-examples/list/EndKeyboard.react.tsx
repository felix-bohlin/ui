import { List, ListItem } from "opui-css/react"

export default function EndKeyboard() {
  return (
    <List>
      <ListItem headline="Save all" end={<kbd>Ctrl+Shift+S</kbd>} />
      <ListItem headline="Save" end={<kbd>Ctrl+S</kbd>} />
    </List>
  )
}
