import { Button, Tooltip } from "opui-css/solid"

export default function Example() {
  return (
    <Tooltip
      label="Rich tooltip"
      content={<p style="max-width: 20ch; font-size: var(--font-size-0);">Detailed description with <strong>rich</strong> content.</p>}
      id="solid-tooltip-rich">
      <Button interestfor="solid-tooltip-rich" commandfor="solid-tooltip-rich" command="toggle-popover" variant="outlined">Rich tooltip</Button>
    </Tooltip>
  )
}
