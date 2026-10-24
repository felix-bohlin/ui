import { List, ListItem } from "opui-css/react"

export default function Basics() {
  return (
    <List>
      <ListItem label="Headline" />
      <ListItem
        label="Headline"
        description="Supporting text that truly is quite long enough to fill up multiple lines."
      />
      <ListItem label="Trailing supporting text" end="100+" />
    </List>
  )
}
