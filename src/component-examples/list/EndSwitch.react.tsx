import { List, ListItem, SwitchInput } from "opui-css/react"

export default function EndSwitch() {
  return (
    <List>
      <ListItem end={<SwitchInput />} label="Bluetooth" type="switch" />
      <ListItem end={<SwitchInput />} label="Wi-Fi" type="switch" />
    </List>
  )
}
