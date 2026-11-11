import { List, ListItem } from "opui-css/react"

export default function StartImage() {
  return (
    <List>
      <ListItem
        description="Supporting text"
        label="Headline"
        start={
          <img
            src="/photos/maya-lind.png"
            alt=""
            decoding="async"
            loading="lazy"
          />
        }
      />
      <ListItem
        description="Supporting text"
        label="Headline"
        start={
          <img
            src="/photos/maya-lind.png"
            alt=""
            decoding="async"
            loading="lazy"
          />
        }
      />
    </List>
  )
}
