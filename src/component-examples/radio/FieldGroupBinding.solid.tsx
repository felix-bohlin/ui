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
  const [plan, setPlan] = createSignal("free")

  function reset() {
    setPlan("free")
  }

  return (
    <>
      <Fieldset>
        <FieldLegend>Plan</FieldLegend>
        <FieldGroup name="radio-binding">
          <Radio
            checked={plan() === "free"}
            onChange={() => setPlan("free")}
            value="free"
          >
            Free
          </Radio>
          <Radio
            checked={plan() === "pro"}
            onChange={() => setPlan("pro")}
            value="pro"
          >
            Pro
          </Radio>
          <Radio
            checked={plan() === "team"}
            onChange={() => setPlan("team")}
            value="team"
          >
            Team
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
