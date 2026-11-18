import { Button, Tooltip, TooltipContent } from "opui-css/react"

export default function Position() {
  return (
    <div className="example-compass">
      <Tooltip id="tooltip-position-1" positionArea="block-start">
        <Button
          aria-describedby="tooltip-position-1"
          interestfor="tooltip-position-1"
        >
          Top
        </Button>
        <TooltipContent>Above</TooltipContent>
      </Tooltip>
      <Tooltip id="tooltip-position-2" positionArea="inline-start">
        <Button
          aria-describedby="tooltip-position-2"
          interestfor="tooltip-position-2"
        >
          Start
        </Button>
        <TooltipContent>Before</TooltipContent>
      </Tooltip>
      <Tooltip id="tooltip-position-3" positionArea="inline-end">
        <Button
          aria-describedby="tooltip-position-3"
          interestfor="tooltip-position-3"
        >
          End
        </Button>
        <TooltipContent>After</TooltipContent>
      </Tooltip>
      <Tooltip id="tooltip-position-4" positionArea="block-end">
        <Button
          aria-describedby="tooltip-position-4"
          interestfor="tooltip-position-4"
        >
          Bottom
        </Button>
        <TooltipContent>Below</TooltipContent>
      </Tooltip>
    </div>
  )
}
