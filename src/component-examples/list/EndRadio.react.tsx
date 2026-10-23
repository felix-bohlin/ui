import { List, ListItem, RadioInput } from "opui-css/react"

export default function EndRadio() {
  return (
    <List>
      <ListItem
        type="radio"
        label="Radio 1"
        end={<RadioInput name="radio-example-group" value="1" />}
      />
      <ListItem
        type="radio"
        label="Radio 2"
        end={<RadioInput name="radio-example-group" value="2" />}
      />
    </List>
  )
}
