/** @jsxImportSource @solidjs/web */
import { List, ListItem, SwitchInput } from "opui-css/solid"

export default function EndSwitch() {
  return (
    <List>
      <ListItem choice="switch" end={<SwitchInput />} label="Bluetooth" />
      <ListItem choice="switch" end={<SwitchInput />} label="Wi-Fi" />
    </List>
  )
}
