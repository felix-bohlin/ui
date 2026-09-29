import { List, ListItem, SwitchInput } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem
        type="switch"
        for="switch-example-1"
        text="Switch 1"
        end={<SwitchInput id="switch-example-1" />}
      />
      <ListItem
        type="switch"
        for="switch-example-2"
        text="Switch 2"
        end={<SwitchInput id="switch-example-2" />}
      />
    </List>
  )
}
