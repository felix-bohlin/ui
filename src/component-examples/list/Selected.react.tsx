import { List, ListItem } from "opui-css/react"

export default function Selected() {
  return (
    <List>
      <ListItem
        aria-current="page"
        description='This item has aria-current="page" on its link'
        href="#"
        label="Selected item"
      />
      <ListItem href="#" label="Normal item" />
    </List>
  )
}
