/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import { Button, Select } from "opui-css/solid"

export default function Binding() {
  const [fruit, setFruit] = createSignal("apples")

  return (
    <>
      <Select
        label="Fruit"
        name="select-binding"
        items={[
          { label: "Apples", value: "apples" },
          { label: "Bananas", value: "bananas" },
          { label: "Cherries", value: "cherries" },
        ]}
        value={fruit()}
        onChange={(event) => setFruit(event.currentTarget.value)}
      />
      <p class="select-binding-text">Selected: {fruit()}</p>
      <Button class="select-binding-reset" onClick={() => setFruit("apples")}>
        Reset
      </Button>
    </>
  )
}
