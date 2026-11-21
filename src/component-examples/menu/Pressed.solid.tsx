/** @jsxImportSource @solidjs/web */
import { Button, Menu } from "opui-css/solid"

export default function Pressed() {
  return (
    <>
      <Button
        command="toggle-popover"
        commandfor="menu-pressed-1"
        variant="outlined"
      >
        View
      </Button>
      <Menu
        id="menu-pressed-1"
        items={[
          { "aria-pressed": "true", label: "Dark mode" },
          { "aria-pressed": "false", label: "Compact rows" },
          { "aria-pressed": "true", label: "Show sidebar" },
        ]}
      />
    </>
  )
}
