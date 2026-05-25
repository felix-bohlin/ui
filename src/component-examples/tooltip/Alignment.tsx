import { Button, Tooltip } from "opui-css/solid"

export default function Example() {
  return (
    <>
      <Tooltip label="Top center" alignment="center end" id="solid-tooltip-top">
        <Button interestfor="solid-tooltip-top" commandfor="solid-tooltip-top" command="toggle-popover" variant="outlined">Top</Button>
      </Tooltip>
      <Tooltip label="Bottom center" alignment="center start" id="solid-tooltip-bottom">
        <Button interestfor="solid-tooltip-bottom" commandfor="solid-tooltip-bottom" command="toggle-popover" variant="outlined">Bottom</Button>
      </Tooltip>
    </>
  )
}
