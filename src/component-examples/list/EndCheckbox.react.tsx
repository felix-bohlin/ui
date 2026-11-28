import { CheckboxInput, List, ListItem } from "opui-css/react"

export default function EndCheckbox() {
  return (
    <List>
      <ListItem
        choice="checkbox"
        end={<CheckboxInput />}
        label="Email notifications"
      />
      <ListItem
        choice="checkbox"
        end={<CheckboxInput />}
        label="Push notifications"
      />
    </List>
  )
}
