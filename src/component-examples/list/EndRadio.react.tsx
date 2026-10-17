import { List, ListItem, RadioInput } from "opui-css/react"

export default function EndRadio() {
  return (
    <List>
      <ListItem
        type="radio"
        htmlFor="radio-example-1"
        text="Radio 1"
        end={
          <RadioInput
            id="radio-example-1"
            name="radio-example-group"
            value="1"
          />
        }
      />
      <ListItem
        type="radio"
        htmlFor="radio-example-2"
        text="Radio 2"
        end={
          <RadioInput
            id="radio-example-2"
            name="radio-example-group"
            value="2"
          />
        }
      />
    </List>
  )
}
