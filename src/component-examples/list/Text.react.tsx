import { List, ListItem } from "opui-css/react"

export default function Text() {
  return (
    <List>
      <ListItem label="Lou Headstock" />
      <ListItem
        description="5-string slapper. Plays every root note with love, owns three pedalboards and still gets called the tall guitarist."
        label="Percy Groove"
      />
      <ListItem label="Ines Hertz">
        <p>Flatwound fan</p>
        <p>Replies between sound checks</p>
      </ListItem>
    </List>
  )
}
