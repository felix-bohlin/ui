<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Options</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Checkbox>Option 1</Checkbox>
        <Checkbox>Option 2</Checkbox>
        <Checkbox>Option 3</Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
