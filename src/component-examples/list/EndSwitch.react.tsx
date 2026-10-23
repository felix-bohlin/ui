import { List, ListItem, SwitchInput } from "opui-css/react"

export default function EndSwitch() {
  return (
    <List>
      <ListItem type="switch" label="Switch 1" end={<SwitchInput />} />
      <ListItem type="switch" label="Switch 2" end={<SwitchInput />} />
    </List>
  )
}
