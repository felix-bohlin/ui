import { List, ListItem } from "opui-css/react"

export default function Ordered() {
  return (
    <List aria-label="Top readers this month" as="ol" bordered>
      <ListItem
        description="42 books"
        label="Ines Moreau"
        start={<span>1</span>}
      />
      <ListItem
        description="37 books"
        label="Tomás Ekberg"
        start={<span>2</span>}
      />
      <ListItem
        description="31 books"
        label="Priya Natarajan"
        start={<span>3</span>}
      />
    </List>
  )
}
