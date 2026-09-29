import { CheckboxInput, List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem
        type="checkbox"
        for="checkbox-example-1"
        text="Checkbox 1"
        end={<CheckboxInput id="checkbox-example-1" />}
      />
      <ListItem
        type="checkbox"
        for="checkbox-example-2"
        text="Checkbox 2"
        end={<CheckboxInput id="checkbox-example-2" />}
      />
    </List>
  )
}
