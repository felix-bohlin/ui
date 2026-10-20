import { Button, Menu } from "opui-css/react"

export default function Dense() {
  return (
    <>
      <Button
        commandfor="menu-dense-1"
        command="toggle-popover"
        variant="outlined"
      >
        Options
      </Button>
      <Menu
        dense
        id="menu-dense-1"
        items={[{ text: "Copy" }, { text: "Cut" }, { text: "Paste" }]}
      />
    </>
  )
}
