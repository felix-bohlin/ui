/** @jsxImportSource @solidjs/web */
import { Button, TextField } from "opui-css/solid"
import { createSignal, createUniqueId } from "solid-js"

export default function SolidRoots() {
  const [count, setCount] = createSignal(0)
  const nameId = createUniqueId()
  return (
    <div class="example-row">
      <TextField for={nameId} label="Name">
        <input id={nameId} />
      </TextField>
      <Button onClick={() => setCount(count() + 1)}>Count {count()}</Button>
    </div>
  )
}
