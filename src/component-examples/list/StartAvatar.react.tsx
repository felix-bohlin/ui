import { Avatar, List, ListItem } from "opui-css/react"

export default function StartAvatar() {
  return (
    <List>
      <ListItem label="Mohini Hertz" start={<Avatar>MH</Avatar>} />
      <ListItem
        description="Fretless enthusiast"
        label="Kinga Headstock"
        start={<Avatar src="/photos/kinga-headstock.png" />}
      />
    </List>
  )
}
