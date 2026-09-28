import { Button, Tooltip } from "opui-css/solid"

export default function Example() {
  return (
    <Tooltip arrow label="Save your changes" id="tooltip-arrow">
      <Button
        interestfor="tooltip-arrow"
        commandfor="tooltip-arrow"
        command="toggle-popover"
      >
        Save
      </Button>
    </Tooltip>
  )
}
