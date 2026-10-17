import { Button, Menu } from "opui-css/react"

export default function Bordered() {
  return (
    <>
      <Button
        commandfor="menu-bordered"
        command="toggle-popover"
        variant="outlined"
      >
        Options
      </Button>
      <Menu
        bordered
        id="menu-bordered"
        items={[{ text: "Edit" }, { text: "Duplicate" }, { text: "Archive" }]}
      />
    </>
  )
}
