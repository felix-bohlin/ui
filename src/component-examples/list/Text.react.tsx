import { List, ListItem } from "opui-css/react"

export default function Text() {
  return (
    <List>
      <ListItem label="Lena Handén" />
      <ListItem
        description="Frontend developer. Builds the checkout and the account pages, and reviews most of the CSS changes."
        label="Pekka Gåpåbottanen"
      />
      <ListItem label="Inga Halonen">
        <p>Support lead</p>
        <p>Replies within a day</p>
      </ListItem>
    </List>
  )
}
