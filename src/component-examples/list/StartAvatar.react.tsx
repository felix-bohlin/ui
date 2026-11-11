import { Avatar, List, ListItem } from "opui-css/react"

export default function StartAvatar() {
  return (
    <List>
      <ListItem
        label="Elif Rahman"
        start={<Avatar aria-hidden="true">ER</Avatar>}
      />
      <ListItem
        description="Product designer"
        label="Lena Ek"
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
