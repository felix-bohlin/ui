"use client"

import { useState } from "react"
import { Chip } from "opui-css/react"

export default function Pressed() {
  const [pressed, setPressed] = useState(["open", "paid"])

  function toggle(value: string) {
    setPressed((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
  }

  return (
    <>
      <div className="example-row">
        <Chip
          aria-pressed={pressed.includes("open")}
          as="button"
          className="chip-pressed"
          label="Open"
          onClick={() => toggle("open")}
          variant="outlined"
        />
        <Chip
          aria-pressed={pressed.includes("in-review")}
          as="button"
          className="chip-pressed"
          label="In review"
          onClick={() => toggle("in-review")}
          variant="outlined"
        />
        <Chip
          aria-pressed={pressed.includes("closed")}
          as="button"
          className="chip-pressed"
          label="Closed"
          onClick={() => toggle("closed")}
          variant="outlined"
        />
      </div>
      <div className="example-row">
        <Chip
          aria-pressed={pressed.includes("paid")}
          as="button"
          className="chip-pressed"
          label="Paid"
          onClick={() => toggle("paid")}
        />
        <Chip
          aria-pressed={pressed.includes("unpaid")}
          as="button"
          className="chip-pressed"
          label="Unpaid"
          onClick={() => toggle("unpaid")}
        />
      </div>
    </>
  )
}
