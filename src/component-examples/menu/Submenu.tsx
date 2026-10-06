import { Button, ListItem, Menu } from "opui-css/solid"

const formats = ["PDF", "PNG", "SVG"].map((label) => ({
  commandfor: "menu-file",
  label,
}))

export default function Example() {
  return (
    <>
      <Button
        commandfor="menu-file"
        command="toggle-popover"
        variant="outlined"
      >
        File
      </Button>
      <Menu id="menu-file" items={[{ label: "New" }, { label: "Open" }]}>
        <ListItem
          as="button"
          headline="Export"
          commandfor="menu-export"
          command="toggle-popover"
          end={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8.293 19.707a1 1 0 0 1 0-1.414L14.586 12l-6.293-6.293a1 1 0 1 1 1.414-1.414l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0"
              ></path>
            </svg>
          }
          submenu={
            <Menu id="menu-export" items={formats} placement="inline-end" />
          }
        />
      </Menu>
    </>
  )
}
