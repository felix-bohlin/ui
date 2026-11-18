import { List, ListItem } from "opui-css/react"

export default function Basics() {
  return (
    <List>
      <ListItem label="Gig poster.pdf" />
      <ListItem
        description="Our logo in every color, with the bass drawn way bigger than the drum kit, at last."
        label="Band logo pack.pdf"
      />
      <ListItem end="100+" label="Photos" />
    </List>
  )
}
