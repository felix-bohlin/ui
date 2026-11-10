import { List, ListItem } from "opui-css/react"

export default function Dense() {
  return (
    <List dense>
      <ListItem label="Q3 report.pdf" />
      <ListItem
        description="Logo, colors and type for print and the web, with an example of each in use."
        label="Brand guidelines.pdf"
      />
      <ListItem end="100+" label="Photos" />
    </List>
  )
}
