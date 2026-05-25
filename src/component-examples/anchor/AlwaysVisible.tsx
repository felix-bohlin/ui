import { Anchor } from "opui-css/solid"

export default function Example() {
  return (
    <Anchor anchored={<span style="background: var(--surface-2); padding: var(--size-2) var(--size-3); border-radius: var(--radius-2); box-shadow: var(--shadow-3);">Floating content</span>}>
      <button>Hover me</button>
    </Anchor>
  )
}
