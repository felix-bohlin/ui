/** @jsxImportSource @solidjs/web */
import { CheckboxInput, List, ListItem } from "opui-css/solid"

export default function Clickable() {
  return (
    <List>
      <ListItem as="button" disabled label="Empty trash" />
      <ListItem as="button" label="New folder" />
      <ListItem href="#clickable-list-item" label="Recent files" />
      <ListItem disabled href="#clickable-list-item" label="Shared drives" />
      <ListItem
        end={<CheckboxInput />}
        label="Show hidden files"
        type="checkbox"
      />
    </List>
  )
}
