import { List, ListItem, SwitchInput } from "opui-css/react"

export default function EndSwitch() {
  return (
    <List>
      <ListItem
        type="switch"
        htmlFor="switch-example-1"
        text="Switch 1"
        end={<SwitchInput id="switch-example-1" />}
      />
      <ListItem
        type="switch"
        htmlFor="switch-example-2"
        text="Switch 2"
        end={<SwitchInput id="switch-example-2" />}
      />
    </List>
  )
}
