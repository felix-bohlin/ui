import { Button, Menu } from "opui-css/react"

export default function Bordered() {
  return (
    <>
      <Button
        command="toggle-popover"
        commandfor="menu-bordered-1"
        variant="outlined"
      >
        Options
      </Button>
      <Menu
        bordered
        id="menu-bordered-1"
        items={[
          { label: "Edit" },
          { label: "Duplicate" },
          { label: "Archive" },
        ]}
      />
    </>
  )
}
