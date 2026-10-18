import { Button, Menu } from "opui-css/react"

export default function Manual() {
  return (
    <>
      <Button
        commandfor="menu-manual-1"
        command="toggle-popover"
        variant="outlined"
      >
        View
      </Button>
      <Menu
        id="menu-manual-1"
        popover="manual"
        items={[
          { text: "Show grid", closeOnClick: false },
          { text: "Show rulers", closeOnClick: false },
          { text: "Done", borderTop: true },
        ]}
      />
    </>
  )
}
