import { Button, Menu } from "opui-css/react"

export default function Basics() {
  return (
    <>
      <Button
        command="toggle-popover"
        commandfor="menu-basics-1"
        variant="outlined"
      >
        Options
      </Button>
      <Menu
        id="menu-basics-1"
        items={[
          { label: "Edit", shortcut: "Ctrl+E" },
          { label: "Duplicate", shortcut: "Ctrl+D" },
          { disabled: true, label: "Archive" },
          { href: "/guide/getting-started/", label: "Help" },
          { borderTop: true, color: "critical", label: "Delete" },
        ]}
      />
    </>
  )
}
