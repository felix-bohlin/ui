/** @jsxImportSource @solidjs/web */
import { List, ListItem, SwitchInput } from "opui-css/solid"

export default function EndSwitch() {
  return (
    <List>
      <ListItem end={<SwitchInput />} label="Switch 1" type="switch" />
      <ListItem end={<SwitchInput />} label="Switch 2" type="switch" />
    </List>
  )
}
