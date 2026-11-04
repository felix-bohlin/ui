"use client"

import { useState } from "react"
import { Range } from "opui-css/react"

export default function ValueText() {
  const [value, setValue] = useState(21)
  return (
    <Range
      aria-valuetext={`${value}°`}
      defaultValue="21"
      id="range-value-text-1"
      label="Temperature"
      max="30"
      min="10"
      onChange={(event) => setValue(event.target.valueAsNumber)}
      valueText={(value) => <b>{value}°</b>}
    />
  )
}
