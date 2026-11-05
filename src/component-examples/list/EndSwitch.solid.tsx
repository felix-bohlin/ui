/** @jsxImportSource @solidjs/web */
import { List, ListItem, SwitchInput } from "opui-css/solid"

export default function EndSwitch() {
  return (
    <List>
      <ListItem end={<SwitchInput />} label="Bluetooth" type="switch" />
      <ListItem end={<SwitchInput />} label="Wi-Fi" type="switch" />
    </List>
  )
}
