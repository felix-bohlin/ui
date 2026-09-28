import { Anchor } from "opui-css/solid"

export default function Example() {
  return (
    <Anchor
      anchored={
        <span>
          <div class="ui-card ui-elevated">Tooltip content</div>
        </span>
      }
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
