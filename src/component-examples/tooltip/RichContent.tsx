import { Button, Tooltip } from "opui-css/solid"

export default function Example() {
  return (
    <Tooltip
      id="tooltip-rich"
      content={
        <>
          Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
        </>
      }
    >
      <Button
        interestfor="tooltip-rich"
        commandfor="tooltip-rich"
        command="toggle-popover"
      >
        Keyboard shortcuts
      </Button>
    </Tooltip>
  )
}
