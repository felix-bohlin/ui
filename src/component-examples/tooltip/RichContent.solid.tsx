/** @jsxImportSource @solidjs/web */
import { Button, Tooltip, TooltipContent } from "opui-css/solid"

export default function RichContent() {
  return (
    <Tooltip id="tooltip-rich-content-1">
      <Button interestfor="tooltip-rich-content-1">Keyboard shortcuts</Button>
      <TooltipContent>
        Press <kbd>⌘</kbd> + <kbd>K</kbd> to open the command palette.
      </TooltipContent>
    </Tooltip>
  )
}
