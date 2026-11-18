/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import { Button, ToggleButton, ToggleGroup } from "opui-css/solid"

export default function Binding() {
  const [view, setView] = createSignal("week")
  const [format, setFormat] = createSignal(["bold"])

  function reset() {
    setView("week")
    setFormat(["bold"])
  }

  return (
    <>
      <ToggleGroup
        aria-label="View"
        name="calendar-view"
        value={view()}
        onValueChange={setView}
      >
        <ToggleButton value="day">Day</ToggleButton>
        <ToggleButton value="week">Week</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
      </ToggleGroup>
      <ToggleGroup
        aria-label="Text format"
        multiple
        name="text-format"
        value={format()}
        onValueChange={setFormat}
      >
        <ToggleButton value="bold">Bold</ToggleButton>
        <ToggleButton value="italic">Italic</ToggleButton>
        <ToggleButton value="underline">Underline</ToggleButton>
      </ToggleGroup>
      <p class="toggle-binding-text">
        View: {view()}. Format: {format().join(", ") || "none"}.
      </p>
      <Button class="toggle-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
