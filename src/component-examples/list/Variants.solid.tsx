/** @jsxImportSource @solidjs/web */
import { List, ListItem } from "opui-css/solid"

export default function Variants() {
  return (
    <>
      <List>
        <ListItem label="Filled (default)" />
        <ListItem label="Second item" />
      </List>

      <List variant="tonal">
        <ListItem label="Tonal" />
        <ListItem label="Second item" />
      </List>

      <List variant="transparent">
        <ListItem label="Transparent" />
        <ListItem label="Second item" />
      </List>
    </>
  )
}
