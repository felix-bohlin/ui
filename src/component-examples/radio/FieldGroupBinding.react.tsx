"use client"

import { useState } from "react"
import {
  Button,
  FieldGroup,
  FieldLegend,
  FieldSet,
  Radio,
} from "opui-css/react"

export default function FieldGroupBinding() {
  const [plan, setPlan] = useState("free")

  function reset() {
    setPlan("free")
  }

  return (
    <>
      <FieldSet>
        <FieldLegend>Plan</FieldLegend>
        <FieldGroup name="radio-binding">
          <Radio
            checked={plan === "free"}
            onChange={() => setPlan("free")}
            value="free"
          >
            Free
          </Radio>
          <Radio
            checked={plan === "pro"}
            onChange={() => setPlan("pro")}
            value="pro"
          >
            Pro
          </Radio>
          <Radio
            checked={plan === "team"}
            onChange={() => setPlan("team")}
            value="team"
          >
            Team
          </Radio>
        </FieldGroup>
      </FieldSet>
      <p className="radio-binding-text">Selected: {plan}</p>
      <Button className="radio-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
