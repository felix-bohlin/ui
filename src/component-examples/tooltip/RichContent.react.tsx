import { Button, Tooltip, TooltipContent } from "opui-css/react"

export default function RichContent() {
  return (
    <Tooltip id="tooltip-rich-content-1">
      <Button
        interestfor="tooltip-rich-content-1"
        commandfor="tooltip-rich-content-1"
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
