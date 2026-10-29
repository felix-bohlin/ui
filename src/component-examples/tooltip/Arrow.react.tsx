import { Button, Tooltip, TooltipContent } from "opui-css/react"

export default function Arrow() {
  return (
    <Tooltip arrow id="tooltip-arrow-1">
      <Button interestfor="tooltip-arrow-1">Save</Button>
      <TooltipContent>Save your changes</TooltipContent>
    </Tooltip>
  )
}
