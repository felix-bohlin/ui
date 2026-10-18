import { CheckboxInput, List, ListItem } from "opui-css/react"

export default function EndCheckbox() {
  return (
    <List>
      <ListItem type="checkbox" text="Checkbox 1" end={<CheckboxInput />} />
      <ListItem type="checkbox" text="Checkbox 2" end={<CheckboxInput />} />
    </List>
  )
}
