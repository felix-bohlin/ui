import { For } from "solid-js"

import { computed, ref } from "vue"
import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "opui-css/solid"

const items = ["Apples", "Bananas", "Cherries"]
const checked = ref([true, false, false])

const allChecked = computed(() => checked.value.every(Boolean))
const someChecked = computed(() => checked.value.some(Boolean))
const indeterminate = computed(() => someChecked.value && !allChecked.value)

function toggleAll() {
  const next = !allChecked.value
  checked.value = checked.value.map(() => next)
}

export default function Example() {
  return (
    <FieldSet class="indeterminate-demo">
      <FieldLegend>
        <Checkbox
          class="parent"
          modelValue={allChecked}
          indeterminate={indeterminate}
          onUpdate:modelValue={toggleAll}
        >
          Select all
        </Checkbox>
      </FieldLegend>
      <FieldGroup name="indeterminate-children">
        <For each={items}>
          {(item, index) => (
            <Checkbox class="child" /* TODO v-model="checked[index]" */>
              {item}
            </Checkbox>
          )}
        </For>
      </FieldGroup>
    </FieldSet>
  )
}
