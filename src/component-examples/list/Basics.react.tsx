import { List, ListItem } from "opui-css/react"

export default function Basics() {
  return (
    <List>
      <ListItem label="Headline" />
      <ListItem
        description="Supporting text that truly is quite long enough to fill up multiple lines."
        label="Headline"
      />
      <ListItem end="100+" label="Trailing supporting text" />
    </List>
  )
}
