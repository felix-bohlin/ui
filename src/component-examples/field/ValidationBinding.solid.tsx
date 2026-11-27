/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import { Field } from "opui-css/solid"

export default function ValidationBinding() {
  const [username, setUsername] = createSignal("scott")
  const invalid = () => /[^a-z0-9]/i.test(username())

  return (
    <Field
      endText={
        invalid()
          ? "Use only letters and numbers."
          : "Letters and numbers, shown on your profile."
      }
      for="field-validation-binding-1"
      label="Username"
    >
      <input
        aria-describedby="field-validation-binding-1-end-text"
        aria-invalid={invalid() ? "true" : undefined}
        id="field-validation-binding-1"
        name="field-validation-binding"
        value={username()}
        onInput={(event) => setUsername(event.currentTarget.value)}
      />
    </Field>
  )
}
