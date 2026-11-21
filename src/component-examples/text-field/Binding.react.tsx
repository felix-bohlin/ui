"use client"

import { useState } from "react"
import { Button, Field } from "opui-css/react"

export default function Binding() {
  const [name, setName] = useState("Holly")

  return (
    <>
      <Field htmlFor="text-field-binding-1" label="Name">
        <input
          id="text-field-binding-1"
          name="text-field-binding"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </Field>
      <p className="text-field-binding-text">Heyyy, {name || "stranger"}.</p>
      <Button
        className="text-field-binding-reset"
        onClick={() => setName("Holly")}
      >
        Reset
      </Button>
    </>
  )
}
