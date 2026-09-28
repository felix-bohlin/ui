import { List, ListItem, RadioInput } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem
        type="radio"
        for="radio-example-1"
        text={<div>Radio 1</div>}
        end={<RadioInput id="radio-example-1" name="radio-example-group" />}
      />
      <ListItem
        type="radio"
        for="radio-example-2"
        text={<div>Radio 2</div>}
        end={<RadioInput id="radio-example-2" name="radio-example-group" />}
      />
    </List>
  )
}
