<script setup lang="ts">
import { Field, SelectButton } from "opui-css/vue"
</script>

<template>
  <Field dense for="field-dense-1" label="Fruit">
    <select id="field-dense-1">
      <SelectButton />
      <option value="">-</option>
      <option>Apple</option>
      <option>Banana</option>
      <option>Cherry</option>
    </select>
  </Field>
</template>
