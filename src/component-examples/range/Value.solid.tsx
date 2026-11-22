/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import { Field } from "opui-css/solid"

export default function Value() {
  const [brightness, setBrightness] = createSignal(80)

  return (
    <Field
      endText={<output for="range-value-1">{`${brightness()}%`}</output>}
      for="range-value-1"
      label="Brightness"
    >
      <input
        aria-valuetext={`${brightness()}%`}
        id="range-value-1"
        type="range"
        value={brightness()}
        onInput={(event) => setBrightness(event.currentTarget.valueAsNumber)}
      />
    </Field>
  )
}
