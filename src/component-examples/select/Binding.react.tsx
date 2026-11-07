"use client"

import { useState } from "react"
import { Button, Select } from "opui-css/react"

export default function Binding() {
  const [fruit, setFruit] = useState("apples")

  return (
    <>
      <Select
        label="Fruit"
        name="select-binding"
        items={[
          { label: "Apples", value: "apples" },
          { label: "Bananas", value: "bananas" },
          { label: "Cherries", value: "cherries" },
        ]}
        value={fruit}
        onChange={(event) => setFruit(event.currentTarget.value)}
      />
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
