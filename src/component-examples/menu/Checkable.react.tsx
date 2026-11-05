import {
  Button,
  CheckboxInput,
  ListItem,
  Menu,
  RadioInput,
} from "opui-css/react"

export default function Checkable() {
  return (
    <>
      <Button
        command="toggle-popover"
        commandfor="menu-checkable-1"
        variant="outlined"
      >
        View
      </Button>
      <Menu id="menu-checkable-1">
        <ListItem
          end={<CheckboxInput />}
          label="Show hidden files"
          type="checkbox"
        />
        <ListItem
          end={<CheckboxInput defaultChecked />}
          label="Show file extensions"
          type="checkbox"
        />
        <li className="ui-border-top ui-heading" id="menu-checkable-1-sort">
          Sort by
        </li>
        <ListItem
          end={
            <RadioInput
              aria-describedby="menu-checkable-1-sort"
              defaultChecked
              name="menu-checkable-1-sort"
              value="name"
            />
          }
          label="Name"
          type="radio"
        />
        <ListItem
          end={
            <RadioInput
              aria-describedby="menu-checkable-1-sort"
              name="menu-checkable-1-sort"
              value="date"
            />
          }
          label="Date modified"
          type="radio"
        />
        <ListItem
          end={
            <RadioInput
              aria-describedby="menu-checkable-1-sort"
              name="menu-checkable-1-sort"
              value="size"
            />
          }
          label="Size"
          type="radio"
        />
      </Menu>
    </>
  )
}
