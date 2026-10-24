import { Button, Menu } from "opui-css/react"

export default function Bordered() {
  return (
    <>
      <Button
        commandfor="menu-bordered-1"
        command="toggle-popover"
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
