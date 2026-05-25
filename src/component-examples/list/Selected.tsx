import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem type="button" selected headline="Selected item" />
      <ListItem type="button" headline="Unselected item" />
      <ListItem type="button" headline="Unselected item" />
    </List>
  )
}
