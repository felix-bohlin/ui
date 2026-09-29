import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem headline="Save all" end={<kbd>CTRL+ALT+DEL</kbd>} />
      <ListItem headline="Save" end={<kbd>CTRL+S</kbd>} />
    </List>
  )
}
