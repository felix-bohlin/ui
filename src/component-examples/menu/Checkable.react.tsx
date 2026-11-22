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
          choice="checkbox"
          end={<CheckboxInput />}
          label="Show hidden files"
        />
        <ListItem
          choice="checkbox"
          end={<CheckboxInput defaultChecked />}
          label="Show file extensions"
        />
        <li className="ui-border-top ui-heading" id="menu-checkable-1-sort">
          Sort by
        </li>
        <ListItem
          choice="radio"
          end={
            <RadioInput
              aria-describedby="menu-checkable-1-sort"
              defaultChecked
              name="menu-checkable-1-sort"
              value="name"
            />
          }
          label="Name"
        />
        <ListItem
          choice="radio"
          end={
            <RadioInput
              aria-describedby="menu-checkable-1-sort"
              name="menu-checkable-1-sort"
              value="date"
            />
          }
          label="Date modified"
        />
        <ListItem
          choice="radio"
          end={
            <RadioInput
              aria-describedby="menu-checkable-1-sort"
              name="menu-checkable-1-sort"
              value="size"
            />
          }
          label="Size"
        />
      </Menu>
    </>
  )
}
