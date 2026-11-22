import { Button, Tooltip, TooltipContent } from "opui-css/react"

export default function Basics() {
  return (
    <Tooltip id="tooltip-basics-1">
      <Button
        aria-describedby="tooltip-basics-1"
        interestfor="tooltip-basics-1"
      >
        Save
      </Button>
      <TooltipContent>Save your changes</TooltipContent>
    </Tooltip>
  )
}
