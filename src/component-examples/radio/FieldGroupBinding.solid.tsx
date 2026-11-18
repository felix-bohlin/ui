/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import {
  Button,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Radio,
} from "opui-css/solid"

export default function FieldGroupBinding() {
  const [plan, setPlan] = createSignal("basic")

  function reset() {
    setPlan("basic")
  }

  return (
    <>
      <Fieldset>
        <FieldLegend>Plan</FieldLegend>
        <FieldGroup name="radio-binding">
          <Radio
            checked={plan() === "basic"}
            onChange={() => setPlan("basic")}
            value="basic"
          >
            Basic
          </Radio>
          <Radio
            checked={plan() === "gold"}
            onChange={() => setPlan("gold")}
            value="gold"
          >
            Gold
          </Radio>
          <Radio
            checked={plan() === "platinum"}
            onChange={() => setPlan("platinum")}
            value="platinum"
          >
            Platinum
          </Radio>
        </FieldGroup>
      </Fieldset>
      <p class="radio-binding-text">Selected: {plan()}</p>
      <Button class="radio-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
