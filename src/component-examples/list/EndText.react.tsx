import { List, ListItem } from "opui-css/react"

export default function EndText() {
  return (
    <List>
      <ListItem end="30kB" label="Headline" />
      <ListItem description="Supporting text" end="99%" label="Headline" />
      <ListItem
        description="Supporting text that truly is quite long enough to fill up multiple lines."
        end="100+"
        label="Headline"
      />
    </List>
  )
}
