import { Button, Menu } from "opui-css/react"

export default function Manual() {
  return (
    <>
      <Button
        commandfor="menu-manual"
        command="toggle-popover"
        variant="outlined"
      >
        View
      </Button>
      <Menu
        id="menu-manual"
        popover="manual"
        items={[
          { label: "Show grid", closeOnClick: false },
          { label: "Show rulers", closeOnClick: false },
          { label: "Done", borderTop: true },
        ]}
      />
    </>
  )
}
