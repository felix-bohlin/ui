import { Button, Tooltip } from "opui-css/solid"

export default function Example() {
  return (
    <Tooltip label="With arrow" arrow id="solid-tooltip-arrow">
      <Button interestfor="solid-tooltip-arrow" commandfor="solid-tooltip-arrow" command="toggle-popover" variant="outlined">Hover me</Button>
    </Tooltip>
  )
}
