/** @jsxImportSource @solidjs/web */
import { Button, Field } from "opui-css/solid"
import { createSignal, createUniqueId } from "solid-js"

export default function SolidRoots() {
  const [count, setCount] = createSignal(0)
  const nameId = createUniqueId()
  return (
    <div class="example-row">
      <Field for={nameId} label="Name">
        <input id={nameId} />
      </Field>
      <Button onClick={() => setCount(count() + 1)}>Count {count()}</Button>
    </div>
  )
}
