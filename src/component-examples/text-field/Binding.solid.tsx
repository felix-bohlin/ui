/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import { Button, TextField } from "opui-css/solid"

export default function Binding() {
  const [name, setName] = createSignal("Ada")

  return (
    <>
      <TextField
        label="Name"
        name="text-field-binding"
        value={name()}
        onInput={(event) => setName(event.currentTarget.value)}
      />
      <p class="text-field-binding-text">Hello, {name() || "stranger"}.</p>
      <Button class="text-field-binding-reset" onClick={() => setName("Ada")}>
        Reset
      </Button>
    </>
  )
}
