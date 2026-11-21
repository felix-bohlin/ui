"use client"

import { useState } from "react"
import { Button, TextField } from "opui-css/react"

export default function Binding() {
  const [name, setName] = useState("Holly")

  return (
    <>
      <TextField htmlFor="text-field-binding-1" label="Name">
        <input
          id="text-field-binding-1"
          name="text-field-binding"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </TextField>
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
