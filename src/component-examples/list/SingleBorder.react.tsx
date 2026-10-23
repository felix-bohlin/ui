import { List, ListItem } from "opui-css/react"

export default function SingleBorder() {
  return (
    <List>
      <ListItem label="I need borders" />
      <ListItem label="Help" />
      <ListItem borderTop label="Thanks" />
    </List>
  )
}
