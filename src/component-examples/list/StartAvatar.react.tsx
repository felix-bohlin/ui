import { Avatar, List, ListItem } from "opui-css/react"

export default function StartAvatar() {
  return (
    <List>
      <ListItem
        label="Ines Hertz"
        start={<Avatar aria-hidden="true">IH</Avatar>}
      />
      <ListItem
        description="Fretless enthusiast"
        label="Lou Headstock"
        start={
          <Avatar>
            <img
              src="/photos/lou-headstock.png"
              alt=""
              decoding="async"
              loading="lazy"
            />
          </Avatar>
        }
      />
    </List>
  )
}
