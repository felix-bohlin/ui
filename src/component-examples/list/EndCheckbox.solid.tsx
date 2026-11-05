/** @jsxImportSource @solidjs/web */
import { CheckboxInput, List, ListItem } from "opui-css/solid"

export default function EndCheckbox() {
  return (
    <List>
      <ListItem
        end={<CheckboxInput />}
        label="Email notifications"
        type="checkbox"
      />
      <ListItem
        end={<CheckboxInput />}
        label="Push notifications"
        type="checkbox"
      />
    </List>
  )
}
