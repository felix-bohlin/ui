import { List, ListItem } from "opui-css/react"

export default function Variants() {
  return (
    <div className="column" style={{ gap: "var(--size-4)" }}>
      <List>
        <ListItem headline="Filled (default)" />
        <ListItem headline="Second item" />
      </List>

      <List variant="tonal">
        <ListItem headline="Tonal" />
        <ListItem headline="Second item" />
      </List>

      <List variant="transparent">
        <ListItem headline="Transparent" />
        <ListItem headline="Second item" />
      </List>
    </div>
  )
}
