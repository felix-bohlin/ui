/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import { Button, Field, SelectButton } from "opui-css/solid"

export default function Binding() {
  const [fruit, setFruit] = createSignal("apples")

  return (
    <>
      <Field for="select-binding-1" label="Fruit">
        <select
          id="select-binding-1"
          name="select-binding"
          onChange={(event) => setFruit(event.currentTarget.value)}
          value={fruit()}
        >
          <SelectButton />
          <option value="apples">Apples</option>
          <option value="bananas">Bananas</option>
          <option value="cherries">Cherries</option>
        </select>
      </Field>
      <p class="select-binding-text">Selected: {fruit()}</p>
      <Button class="select-binding-reset" onClick={() => setFruit("apples")}>
        Reset
      </Button>
    </>
  )
}
