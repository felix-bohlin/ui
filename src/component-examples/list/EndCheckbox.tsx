import { CheckboxInput, List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem
        type="checkbox"
        for="checkbox-example-1"
        text={<div>Checkbox 1</div>}
        end={<CheckboxInput id="checkbox-example-1" />}
      />
      <ListItem
        type="checkbox"
        for="checkbox-example-2"
        text={<div>Checkbox 2</div>}
        end={<CheckboxInput id="checkbox-example-2" />}
      />
    </List>
  )
}
