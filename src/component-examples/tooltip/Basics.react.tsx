import { Button, Tooltip } from "opui-css/react"

export default function Basics() {
  return (
    <Tooltip label="Save your changes" id="tooltip-basic">
      <Button
        interestfor="tooltip-basic"
        commandfor="tooltip-basic"
        command="toggle-popover"
      >
        Save
      </Button>
    </Tooltip>
  )
}
