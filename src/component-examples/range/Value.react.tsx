"use client"

import { useState } from "react"
import { Field } from "opui-css/react"

export default function Value() {
  const [brightness, setBrightness] = useState(80)

  return (
    <Field
      endText={<output htmlFor="range-value-1">{`${brightness}%`}</output>}
      htmlFor="range-value-1"
      label="Brightness"
    >
      <input
        aria-valuetext={`${brightness}%`}
        id="range-value-1"
        type="range"
        value={brightness}
        onChange={(event) => setBrightness(event.currentTarget.valueAsNumber)}
      />
    </Field>
  )
}
