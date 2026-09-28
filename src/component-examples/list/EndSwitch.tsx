import { List, ListItem, SwitchInput } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem
        type="switch"
        for="switch-example-1"
        text={<div>Switch 1</div>}
        end={<SwitchInput id="switch-example-1" />}
      />
      <ListItem
        type="switch"
        for="switch-example-2"
        text={<div>Switch 2</div>}
        end={<SwitchInput id="switch-example-2" />}
      />
    </List>
  )
}
