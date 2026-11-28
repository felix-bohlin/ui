"use client"

import { useState } from "react"
import { Field } from "opui-css/react"

const qualities = ["Low", "Medium", "High"]

export default function TickMarksLabels() {
  const [opacity, setOpacity] = useState(50)
  const [quality, setQuality] = useState(1)

  return (
    <>
      <Field htmlFor="range-tick-marks-labels-1" label="Opacity">
        <input
          aria-valuetext={`${opacity}%`}
          id="range-tick-marks-labels-1"
          list="range-tick-marks-labels-1-list"
          onChange={(event) => setOpacity(event.currentTarget.valueAsNumber)}
          step="25"
          type="range"
          value={opacity}
        />
        <datalist aria-hidden="true" id="range-tick-marks-labels-1-list">
          <option label="0%" value="0"></option>
          <option label="25%" value="25"></option>
          <option label="50%" value="50"></option>
          <option label="75%" value="75"></option>
          <option label="100%" value="100"></option>
        </datalist>
      </Field>
      <Field htmlFor="range-tick-marks-labels-2" label="Quality">
        <input
          aria-valuetext={qualities[quality]}
          id="range-tick-marks-labels-2"
          list="range-tick-marks-labels-2-list"
          max="2"
          onChange={(event) => setQuality(event.currentTarget.valueAsNumber)}
          type="range"
          value={quality}
        />
        <datalist aria-hidden="true" id="range-tick-marks-labels-2-list">
          <option label="Low" value="0"></option>
          <option label="Medium" value="1"></option>
          <option label="High" value="2"></option>
        </datalist>
      </Field>
    </>
  )
}
