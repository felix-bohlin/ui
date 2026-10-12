import { CheckboxInput, List, ListItem } from "opui-css/react"

export default function Clickable() {
  return (
    <List>
      <ListItem as="button" headline="Button list item" />
      <ListItem as="a" href="#clickable-list-item" headline="Link list item" />
      <ListItem
        type="checkbox"
        htmlFor="clickable-checkbox"
        headline="Checkbox list item"
        end={<CheckboxInput id="clickable-checkbox" />}
      />
    </List>
  )
}
