<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>

<template>
<Form>
  <FieldSet>
    <FieldLegend>Options</FieldLegend>
    <FieldGroup direction="row">
      <Checkbox>Option 1</Checkbox>
      <Checkbox>Option 2</Checkbox>
      <Checkbox>Option 3</Checkbox>
    </FieldGroup>
  </FieldSet>
</Form>
</template>
