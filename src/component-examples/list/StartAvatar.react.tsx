import { Avatar, List, ListItem } from "opui-css/react"

export default function StartAvatar() {
  return (
    <List>
      <ListItem
        label="Inga Halonen"
        start={<Avatar aria-hidden="true">IH</Avatar>}
      />
      <ListItem
        description="Product designer"
        label="Lena Handén"
        start={
          <Avatar>
            <img
              src="/photos/lena-handen.png"
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
