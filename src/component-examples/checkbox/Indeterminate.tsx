import { createMemo, createSignal, For } from "solid-js"
import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "opui-css/solid"

const items = ["Apples", "Bananas", "Cherries"]

export default function Example() {
  const [checked, setChecked] = createSignal([true, false, false])

  const allChecked = createMemo(() => checked().every(Boolean))
  const someChecked = createMemo(() => checked().some(Boolean))
  const indeterminate = () => someChecked() && !allChecked()

  function toggleAll() {
    const next = !allChecked()
    setChecked(checked().map(() => next))
  }

  function toggle(index: number, value: boolean) {
    setChecked(checked().map((item, i) => (i === index ? value : item)))
  }

  return (
    <FieldSet class="indeterminate-demo">
      <FieldLegend>
        <Checkbox
          class="parent"
          checked={allChecked()}
          indeterminate={indeterminate()}
          onChange={toggleAll}
        >
          Select all
        </Checkbox>
      </FieldLegend>
      <FieldGroup name="indeterminate-children">
        <For each={items}>
          {(item, index) => (
            <Checkbox
              class="child"
              checked={checked()[index()]}
              onChange={(event) => toggle(index(), event.currentTarget.checked)}
            >
              {item}
            </Checkbox>
          )}
        </For>
      </FieldGroup>
    </FieldSet>
  )
}
