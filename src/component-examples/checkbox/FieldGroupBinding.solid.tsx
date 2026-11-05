/** @jsxImportSource @solidjs/web */
import { createSignal } from "solid-js"
import {
  Button,
  Checkbox,
  FieldGroup,
  FieldLegend,
  Fieldset,
} from "opui-css/solid"

export default function FieldGroupBinding() {
  const [fruit, setFruit] = createSignal(["apples"])

  function reset() {
    setFruit(["apples"])
  }

  function toggle(event: Event & { currentTarget: HTMLInputElement }) {
    const { checked, value } = event.currentTarget
    setFruit((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value),
    )
  }

  return (
    <>
      <Fieldset>
        <FieldLegend>Fruit</FieldLegend>
        <FieldGroup name="checkbox-binding">
          <Checkbox
            checked={fruit().includes("apples")}
            onChange={toggle}
            value="apples"
          >
            Apples
          </Checkbox>
          <Checkbox
            checked={fruit().includes("bananas")}
            onChange={toggle}
            value="bananas"
          >
            Bananas
          </Checkbox>
          <Checkbox
            checked={fruit().includes("cherries")}
            onChange={toggle}
            value="cherries"
          >
            Cherries
          </Checkbox>
        </FieldGroup>
      </Fieldset>
      <p class="checkbox-binding-text">
        Selected: {fruit().join(", ") || "none"}
      </p>
      <Button class="checkbox-binding-reset" onClick={reset}>
        Reset
      </Button>
    </>
  )
}
