import { List, ListItem } from "opui-css/react"

export default function Selected() {
  return (
    <List>
      <ListItem
        href="#"
        aria-current="page"
        headline="Selected item"
        description='This item has aria-current="page" on its link'
      />
      <ListItem href="#" headline="Normal item" />
    </List>
  )
}
