"use client"

import { type ChangeEvent, useState } from "react"
import {
  Button,
  Checkbox,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/react"

export default function FieldGroupBinding() {
  const [fruit, setFruit] = useState(["apples"])

  function reset() {
    setFruit(["apples"])
  }

  function toggle(event: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target
    setFruit((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value),
    )
  }

  return (
    <>
      <FieldSet>
        <FieldLegend>Fruit</FieldLegend>
        <FieldGroup name="checkbox-binding">
          <Checkbox
            checked={fruit.includes("apples")}
            onChange={toggle}
            value="apples"
          >
            Apples
          </Checkbox>
          <Checkbox
            checked={fruit.includes("bananas")}
            onChange={toggle}
            value="bananas"
          >
            Bananas
          </Checkbox>
          <Checkbox
            checked={fruit.includes("cherries")}
            onChange={toggle}
            value="cherries"
          >
            Cherries
          </Checkbox>
        </FieldGroup>
      </FieldSet>
      <p className="checkbox-binding-text">
        Selected: {fruit.join(", ") || "none"}
      </p>
      <Button className="checkbox-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
