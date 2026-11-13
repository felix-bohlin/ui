import { List, ListItem, SwitchInput } from "opui-css/react"

export default function EndSwitch() {
  return (
    <List>
      <ListItem choice="switch" end={<SwitchInput />} label="Bluetooth" />
      <ListItem choice="switch" end={<SwitchInput />} label="Wi-Fi" />
    </List>
  )
}
