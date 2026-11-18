/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import { Range } from "opui-css/solid"

export default function ValueText() {
  const [value, setValue] = createSignal(21)
  return (
    <Range
      aria-valuetext={`${value()}°`}
      defaultValue="21"
      id="range-value-text-1"
      label="Temperature"
      max="30"
      min="10"
      onInput={(event) => setValue(event.currentTarget.valueAsNumber)}
      valueText={<b>{value()}°</b>}
    />
  )
}
