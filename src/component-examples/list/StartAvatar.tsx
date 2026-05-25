import { Avatar, List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem headline="John Doe" start={<Avatar>JD</Avatar>} />
      <ListItem headline="Jane Smith" start={<Avatar>JS</Avatar>} />
      <ListItem headline="Bob Wilson" start={<Avatar>BW</Avatar>} />
    </List>
  )
}
