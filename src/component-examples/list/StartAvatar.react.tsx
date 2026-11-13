import { Avatar, List, ListItem } from "opui-css/react"

export default function StartAvatar() {
  return (
    <List>
      <ListItem label="Ines Hertz" start={<Avatar>IH</Avatar>} />
      <ListItem
        description="Fretless enthusiast"
        label="Lou Headstock"
        start={<Avatar src="/photos/lou-headstock.png" />}
      />
    </List>
  )
}
