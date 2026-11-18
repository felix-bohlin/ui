/** @jsxImportSource @solidjs/web */
import { Button, TextField } from "opui-css/solid"
import { createSignal } from "solid-js"

export default function SolidRoots() {
  const [count, setCount] = createSignal(0)
  return (
    <div class="example-row">
      <TextField label="Name" />
      <Button onClick={() => setCount(count() + 1)}>Count {count()}</Button>
    </div>
  )
}
