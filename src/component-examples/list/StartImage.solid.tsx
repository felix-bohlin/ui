/** @jsxImportSource @solidjs/web */
import { List, ListItem } from "opui-css/solid"

export default function StartImage() {
  return (
    <List>
      <ListItem
        description="48 photos"
        label="Gig in a basement"
        start={
          <img
            src="/photos/kinga-headstock.png"
            alt=""
            decoding="async"
            loading="lazy"
          />
        }
      />
      <ListItem
        description="112 photos"
        label="Pedalboard glamour shots"
        start={
          <img
            src="/photos/kinga-headstock.png"
            alt=""
            decoding="async"
            loading="lazy"
          />
        }
      />
    </List>
  )
}
