import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem headline="Headline" end={<div>30kB</div>} />
      <ListItem
        headline="Headline"
        description="Supporting text"
        end={<div>99%</div>}
      />
      <ListItem
        headline="Headline"
        description="Supporting text that truly is quite long enough to fill up multiple lines."
        end={<div>100+</div>}
      />
    </List>
  )
}
