import { Button, Tooltip } from "opui-css/solid"

export default function Example() {
  return (
    <Tooltip label="Save your changes" id="solid-tooltip-basic">
      <Button interestfor="solid-tooltip-basic" commandfor="solid-tooltip-basic" command="toggle-popover" variant="outlined">Save</Button>
    </Tooltip>
  )
}
