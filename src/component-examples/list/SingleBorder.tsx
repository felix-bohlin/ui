import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem headline="I need borders" />
      <ListItem headline="Help" />
      <ListItem borderTop headline="Thanks" />
    </List>
  )
}
