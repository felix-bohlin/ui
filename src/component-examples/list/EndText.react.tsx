import { List, ListItem } from "opui-css/react"

export default function EndText() {
  return (
    <List>
      <ListItem headline="Headline" end="30kB" />
      <ListItem headline="Headline" description="Supporting text" end="99%" />
      <ListItem
        headline="Headline"
        description="Supporting text that truly is quite long enough to fill up multiple lines."
        end="100+"
      />
    </List>
  )
}
