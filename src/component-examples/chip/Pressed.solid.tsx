/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import { Chip } from "opui-css/solid"

export default function Pressed() {
  const [pressed, setPressed] = createSignal(["open", "paid"])

  const isPressed = (value: string) =>
    pressed().includes(value) ? "true" : "false"

  function toggle(value: string) {
    setPressed((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
  }

  return (
    <>
      <div class="example-row">
        <Chip
          aria-pressed={isPressed("open")}
          as="button"
          class="chip-pressed"
          label="Open"
          onClick={() => toggle("open")}
          variant="outlined"
        />
        <Chip
          aria-pressed={isPressed("in-review")}
          as="button"
          class="chip-pressed"
          label="In review"
          onClick={() => toggle("in-review")}
          variant="outlined"
        />
        <Chip
          aria-pressed={isPressed("closed")}
          as="button"
          class="chip-pressed"
          label="Closed"
          onClick={() => toggle("closed")}
          variant="outlined"
        />
      </div>
      <div class="example-row">
        <Chip
          aria-pressed={isPressed("paid")}
          as="button"
          class="chip-pressed"
          label="Paid"
          onClick={() => toggle("paid")}
        />
        <Chip
          aria-pressed={isPressed("unpaid")}
          as="button"
          class="chip-pressed"
          label="Unpaid"
          onClick={() => toggle("unpaid")}
        />
      </div>
    </>
  )
}
