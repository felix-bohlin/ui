import { List, ListItem } from "opui-css/react"

export default function StartImage() {
  return (
    <List>
      <ListItem
        description="48 photos"
        label="Summer in Lisbon"
        start={
          <img
            src="/photos/lena-handen.png"
            alt=""
            decoding="async"
            loading="lazy"
          />
        }
      />
      <ListItem
        description="112 photos"
        label="Team offsite"
        start={
          <img
            src="/photos/lena-handen.png"
            alt=""
            decoding="async"
            loading="lazy"
          />
        }
      />
    </List>
  )
}
