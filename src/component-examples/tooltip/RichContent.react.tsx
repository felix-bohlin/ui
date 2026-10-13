import { Button, Tooltip, TooltipContent } from "opui-css/react"

export default function RichContent() {
  return (
    <Tooltip id="tooltip-rich">
      <Button
        interestfor="tooltip-rich"
        commandfor="tooltip-rich"
        command="toggle-popover"
      >
        Keyboard shortcuts
      </Button>
      <TooltipContent>
        Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
      </TooltipContent>
    </Tooltip>
  )
}
