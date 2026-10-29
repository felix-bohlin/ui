import { List, ListItem } from "opui-css/react"

export default function EndText() {
  return (
    <List>
      <ListItem label="Headline" end="30kB" />
      <ListItem label="Headline" description="Supporting text" end="99%" />
      <ListItem
        label="Headline"
        description="Supporting text that truly is quite long enough to fill up multiple lines."
        end="100+"
      />
    </List>
  )
}
