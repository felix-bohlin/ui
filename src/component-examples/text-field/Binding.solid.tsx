/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import { Button, Field } from "opui-css/solid"

export default function Binding() {
  const [name, setName] = createSignal("Holly")

  return (
    <>
      <Field for="text-field-binding-1" label="Name">
        <input
          id="text-field-binding-1"
          name="text-field-binding"
          value={name()}
          onInput={(event) => setName(event.currentTarget.value)}
        />
      </Field>
      <p class="text-field-binding-text">Heyyy, {name() || "stranger"}.</p>
      <Button class="text-field-binding-reset" onClick={() => setName("Holly")}>
        Reset
      </Button>
    </>
  )
}
