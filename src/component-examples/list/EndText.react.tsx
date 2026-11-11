import { List, ListItem } from "opui-css/react"

export default function EndText() {
  return (
    <List>
      <ListItem end="2.4 MB" label="Q3 report.pdf" />
      <ListItem
        description="Uploaded by Lena Ek"
        end="860 kB"
        label="Team photo.jpg"
      />
      <ListItem
        description="Logo, colors and type in print and on the web, with an example of each in use."
        end="12 MB"
        label="Brand guidelines.pdf"
      />
    </List>
  )
}
