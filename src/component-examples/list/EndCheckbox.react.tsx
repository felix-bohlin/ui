import { CheckboxInput, List, ListItem } from "opui-css/react"

export default function EndCheckbox() {
  return (
    <List>
      <ListItem
        type="checkbox"
        htmlFor="checkbox-example-1"
        text="Checkbox 1"
        end={<CheckboxInput id="checkbox-example-1" />}
      />
      <ListItem
        type="checkbox"
        htmlFor="checkbox-example-2"
        text="Checkbox 2"
        end={<CheckboxInput id="checkbox-example-2" />}
      />
    </List>
  )
}
