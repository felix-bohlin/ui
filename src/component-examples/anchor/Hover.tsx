import { Anchor } from "opui-css/solid"

export default function Example() {
  return (
    <Anchor trigger="hover" id="anchor-hover"
      anchored={<span><div class="card elevated">Tooltip content</div></span>}>
      <button interestfor="anchor-hover" commandfor="anchor-hover" command="toggle-popover">Hover me</button>
    </Anchor>
  )
}
