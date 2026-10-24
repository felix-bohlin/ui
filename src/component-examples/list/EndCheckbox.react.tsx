import { CheckboxInput, List, ListItem } from "opui-css/react"

export default function EndCheckbox() {
  return (
    <List>
      <ListItem type="checkbox" label="Checkbox 1" end={<CheckboxInput />} />
      <ListItem type="checkbox" label="Checkbox 2" end={<CheckboxInput />} />
    </List>
  )
}
