import { List, ListItem, SwitchInput } from "opui-css/react"

export default function EndSwitch() {
  return (
    <List>
      <ListItem type="switch" text="Switch 1" end={<SwitchInput />} />
      <ListItem type="switch" text="Switch 2" end={<SwitchInput />} />
    </List>
  )
}
