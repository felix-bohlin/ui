import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem inset headline="Inset item" />
      <ListItem inset headline="Inset item" />
      <ListItem headline="Normal item" />
    </List>
  )
}
