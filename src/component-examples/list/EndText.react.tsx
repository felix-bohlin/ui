import { List, ListItem } from "opui-css/react"

export default function EndText() {
  return (
    <List>
      <ListItem end="2.4 MB" label="Slap lesson 3.pdf" />
      <ListItem
        description="Uploaded by Lou Headstock"
        end="860 kB"
        label="Band photo.jpg"
      />
      <ListItem
        description="Every root note of the setlist, with a tiny drawing of where the drummer should look when it changes."
        end="12 MB"
        label="Bass charts.pdf"
      />
    </List>
  )
}
