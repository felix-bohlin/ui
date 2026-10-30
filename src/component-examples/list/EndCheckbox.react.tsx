import { CheckboxInput, List, ListItem } from "opui-css/react"

export default function EndCheckbox() {
  return (
    <List>
      <ListItem end={<CheckboxInput />} label="Checkbox 1" type="checkbox" />
      <ListItem end={<CheckboxInput />} label="Checkbox 2" type="checkbox" />
    </List>
  )
}
