import { Button, Tooltip, TooltipContent } from "opui-css/react"

export default function Arrow() {
  return (
    <Tooltip arrow id="tooltip-arrow">
      <Button
        interestfor="tooltip-arrow"
        commandfor="tooltip-arrow"
        command="toggle-popover"
      >
        Save
      </Button>
      <TooltipContent>Save your changes</TooltipContent>
    </Tooltip>
  )
}
