"use client"

import { useState } from "react"
import {
  Button,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Radio,
} from "opui-css/react"

export default function FieldGroupBinding() {
  const [plan, setPlan] = useState("starter")

  function reset() {
    setPlan("starter")
  }

  return (
    <>
      <Fieldset>
        <FieldLegend>Plan</FieldLegend>
        <FieldGroup name="radio-binding">
          <Radio
            checked={plan === "starter"}
            onChange={() => setPlan("starter")}
            value="starter"
          >
            Starter
          </Radio>
          <Radio
            checked={plan === "team"}
            onChange={() => setPlan("team")}
            value="team"
          >
            Team
          </Radio>
          <Radio
            checked={plan === "business"}
            onChange={() => setPlan("business")}
            value="business"
          >
            Business
          </Radio>
        </FieldGroup>
      </Fieldset>
      <p className="radio-binding-text">Selected: {plan}</p>
      <Button className="radio-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
