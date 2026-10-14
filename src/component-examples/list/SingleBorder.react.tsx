import { List, ListItem } from "opui-css/react"

export default function SingleBorder() {
  return (
    <List>
      <ListItem headline="I need borders" />
      <ListItem headline="Help" />
      <ListItem borderTop headline="Thanks" />
    </List>
  )
}
