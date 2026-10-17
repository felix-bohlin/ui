import { List, ListItem } from "opui-css/react"

export default function Default() {
  return (
    <List>
      <ListItem headline="Headline" />
      <ListItem
        headline="Headline"
        description="Supporting text that truly is quite long enough to fill up multiple lines."
      />
      <ListItem headline="Trailing supporting text" end="100+" />
    </List>
  )
}
