import { Avatar, List, ListItem } from "opui-css/react"

export default function StartAvatar() {
  return (
    <List>
      <ListItem
        label="Headline"
        start={<Avatar aria-hidden="true">AB</Avatar>}
      />
      <ListItem
        description="Supporting text"
        label="Headline"
        start={
          <Avatar>
            <img
              src="/photos/maya-lind.png"
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
