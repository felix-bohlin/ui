import { List, ListItem } from "opui-css/react"

export default function Text() {
  return (
    <List>
      <ListItem label="Headline" />
      <ListItem
        description="Supporting text that truly is quite long enough to fill up multiple lines."
        label="Headline"
      />
      <ListItem label="Headline">
        <p>Supporting text</p>
        <p>Even more supporting text</p>
      </ListItem>
    </List>
  )
}
