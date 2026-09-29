import { Anchor } from "opui-css/solid"

export default function Example() {
  return (
    <Anchor
      anchored={<div class="ui-card ui-elevated">Tooltip content</div>}
      id="anchor-hover"
      trigger="hover"
    >
      <button
        interestfor="anchor-hover"
        commandfor="anchor-hover"
        command="toggle-popover"
      >
        Hover me
      </button>
    </Anchor>
  )
}
