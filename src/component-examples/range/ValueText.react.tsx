"use client"

import { Range } from "opui-css/react"

export default function ValueText() {
  return (
    <Range
      defaultValue="21"
      id="range-value-text-1"
      label="Temperature"
      max="30"
      min="10"
      valueText={(value) => <b>{value}°</b>}
    />
  )
}
