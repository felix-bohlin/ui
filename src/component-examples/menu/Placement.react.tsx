import { Button, Menu } from "opui-css/react"

const items = [{ text: "First" }, { text: "Second" }, { text: "Third" }]

export default function Placement() {
  return (
    <>
      <Button
        commandfor="menu-placement-1"
        command="toggle-popover"
        variant="outlined"
      >
        Block start
      </Button>
      <Menu id="menu-placement-1" items={items} placement="block-start" />
      <Button
        commandfor="menu-placement-2"
        command="toggle-popover"
        variant="outlined"
      >
        Block end
      </Button>
      <Menu id="menu-placement-2" items={items} />
      <Button
        commandfor="menu-placement-3"
        command="toggle-popover"
        variant="outlined"
      >
        Inline start
      </Button>
      <Menu id="menu-placement-3" items={items} placement="inline-start" />
      <Button
        commandfor="menu-placement-4"
        command="toggle-popover"
        variant="outlined"
      >
        Inline end
      </Button>
      <Menu id="menu-placement-4" items={items} placement="inline-end" />
      <Button
        commandfor="menu-placement-5"
        command="toggle-popover"
        variant="outlined"
      >
        Align end
      </Button>
      <Menu align="end" id="menu-placement-5" items={items} />
    </>
  )
}
