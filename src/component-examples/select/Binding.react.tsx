"use client"

import { useState } from "react"
import { Button, Field, SelectButton } from "opui-css/react"

export default function Binding() {
  const [fruit, setFruit] = useState("apples")

  return (
    <>
      <Field htmlFor="select-binding-1" label="Fruit">
        <select
          id="select-binding-1"
          name="select-binding"
          onChange={(event) => setFruit(event.currentTarget.value)}
          value={fruit}
        >
          <SelectButton />
          <option value="apples">Apples</option>
          <option value="bananas">Bananas</option>
          <option value="cherries">Cherries</option>
        </select>
      </Field>
      <p className="select-binding-text">Selected: {fruit}</p>
      <Button
        className="select-binding-reset"
        onClick={() => setFruit("apples")}
      >
        Reset
      </Button>
    </>
  )
}
