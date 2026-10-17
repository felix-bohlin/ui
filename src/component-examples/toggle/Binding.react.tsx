"use client"

import { useState } from "react"
import { Button, ToggleButton, ToggleGroup } from "opui-css/react"

export default function Binding() {
  const [view, setView] = useState("week")
  const [format, setFormat] = useState(["bold"])

  function reset() {
    setView("week")
    setFormat(["bold"])
  }

  return (
    <>
      <ToggleGroup
        aria-label="View"
        name="calendar-view"
        selection="single"
        value={view}
        onValueChange={setView}
      >
        <ToggleButton value="day">Day</ToggleButton>
        <ToggleButton value="week">Week</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
      </ToggleGroup>
      <ToggleGroup
        aria-label="Text format"
        name="text-format"
        value={format}
        onValueChange={setFormat}
      >
        <ToggleButton value="bold">Bold</ToggleButton>
        <ToggleButton value="italic">Italic</ToggleButton>
        <ToggleButton value="underline">Underline</ToggleButton>
      </ToggleGroup>
      <p className="toggle-binding-text">
        View: {view}. Format: {format.join(", ") || "none"}.
      </p>
      <Button className="toggle-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
