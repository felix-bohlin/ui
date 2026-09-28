import { List, ListItem } from "opui-css/solid"

export default function Example() {
  return (
    <List>
      <ListItem
        headline="Save all"
        end={
          <div>
            <kbd>CTRL+ALT+DEL</kbd>
          </div>
        }
      />
      <ListItem
        headline="Save"
        end={
          <div>
            <kbd>CTRL+S</kbd>
          </div>
        }
      />
    </List>
  )
}
