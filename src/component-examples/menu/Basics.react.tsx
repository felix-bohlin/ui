import { Button, Menu } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Button
        commandfor="menu-basics-1"
        command="toggle-popover"
        variant="outlined"
      >
        Options
      </Button>
      <Menu
        id="menu-basics-1"
        items={[
          { text: "Edit", shortcut: "Ctrl+E" },
          { text: "Duplicate", shortcut: "Ctrl+D" },
          { text: "Archive", disabled: true },
          { text: "Help", href: "#basics" },
          { text: "Delete", borderTop: true, critical: true },
        ]}
      />
    </>
  )
}
