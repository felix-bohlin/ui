<script setup lang="ts">
import { computed, ref } from "vue"
import { Checkbox, FieldGroup, FieldLegend, FieldSet } from "opui-css/vue"

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
  <FieldSet>
    <FieldLegend>
      <Checkbox
        :model-value="allChecked"
        :indeterminate="indeterminate"
        @update:model-value="toggleAll"
        >Select all</Checkbox
      >
    </FieldLegend>
    <FieldGroup name="indeterminate-children">
      <Checkbox
        v-for="(item, index) in items"
        :key="item"
        v-model="checked[index]"
        >{{ item }}</Checkbox
      >
    </FieldGroup>
  </FieldSet>
</template>
