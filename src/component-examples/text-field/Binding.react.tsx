"use client"

import { useState } from "react"
import { Button, TextField } from "opui-css/react"

export default function Binding() {
  const [name, setName] = useState("Hakki")

  return (
    <>
      <TextField
        label="Name"
        name="text-field-binding"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <p className="text-field-binding-text">Hello, {name || "stranger"}.</p>
      <Button
        className="text-field-binding-reset"
        onClick={() => setName("Hakki")}
      >
        Reset
      </Button>
    </>
  )
}
