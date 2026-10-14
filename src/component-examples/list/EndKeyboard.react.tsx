import { List, ListItem } from "opui-css/react"

export default function EndKeyboard() {
  return (
    <List>
      <ListItem headline="Save all" end={<kbd>CTRL+ALT+DEL</kbd>} />
      <ListItem headline="Save" end={<kbd>CTRL+S</kbd>} />
    </List>
  )
}
