<script setup lang="ts">
import { computed, ref } from "vue"
import {
  Checkbox,
  CheckboxInput,
  CheckboxLabel,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "opui-css/vue"

const items = ["Apples", "Bananas", "Cherries"]
const checked = ref([true, false, false])

const allChecked = computed(() => checked.value.every(Boolean))
const someChecked = computed(() => checked.value.some(Boolean))
const indeterminate = computed(() => someChecked.value && !allChecked.value)

function toggleAll() {
  const next = !allChecked.value
  checked.value = checked.value.map(() => next)
}
</script>

<template>
  <FieldSet class="indeterminate-demo">
    <FieldLegend>
      <Checkbox class="parent">
        <CheckboxInput
          :model-value="allChecked"
          :indeterminate="indeterminate"
          @update:model-value="toggleAll"
        />
        <CheckboxLabel>Select all</CheckboxLabel>
      </Checkbox>
    </FieldLegend>
    <FieldGroup name="indeterminate-children">
      <Checkbox class="child" v-for="(item, index) in items" :key="item">
        <CheckboxInput v-model="checked[index]" />
        <CheckboxLabel>{{ item }}</CheckboxLabel>
      </Checkbox>
    </FieldGroup>
  </FieldSet>
</template>
