import { Button, Menu } from "opui-css/react"

export default function Dense() {
  return (
    <>
      <Button
        command="toggle-popover"
        commandfor="menu-dense-1"
        variant="outlined"
      >
        Options
      </Button>
      <Menu
        dense
        id="menu-dense-1"
        items={[{ label: "Copy" }, { label: "Cut" }, { label: "Paste" }]}
      />
    </>
  )
}
