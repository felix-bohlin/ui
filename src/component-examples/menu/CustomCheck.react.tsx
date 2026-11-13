import { Button, ListItem, Menu } from "opui-css/react"

export default function CustomCheck() {
  return (
    <>
      <Button
        command="toggle-popover"
        commandfor="menu-custom-check-1"
        variant="outlined"
      >
        Theme
      </Button>
      <Menu
        iconChecked={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        }
        id="menu-custom-check-1"
        items={[
          { label: "Light" },
          { "aria-current": "true", label: "Dark" },
          { label: "System" },
        ]}
      />

      <Button
        command="toggle-popover"
        commandfor="menu-custom-check-2"
        variant="outlined"
      >
        Sort by
      </Button>
      <Menu id="menu-custom-check-2">
        <ListItem
          aria-current="true"
          as="button"
          command="hide-popover"
          commandfor="menu-custom-check-2"
          iconChecked={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          }
          label="Name"
        />
        <ListItem
          as="button"
          command="hide-popover"
          commandfor="menu-custom-check-2"
          iconChecked={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          }
          label="Date modified"
        />
      </Menu>
    </>
  )
}
