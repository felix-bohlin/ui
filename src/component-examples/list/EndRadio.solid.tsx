/** @jsxImportSource @solidjs/web */
import { List, ListItem, RadioInput } from "opui-css/solid"

export default function EndRadio() {
  return (
    <List>
      <ListItem
        end={<RadioInput name="theme" value="dark" />}
        label="Dark mode"
        type="radio"
      />
      <ListItem
        end={<RadioInput name="theme" value="light" />}
        label="Light mode"
        type="radio"
      />
    </List>
  )
}
