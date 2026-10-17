<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet aria-describedby="radio-group-error">
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="radio-group-validation">
        <Radio checked error value="1">Radio 1</Radio>
        <Radio error value="2">Radio 2</Radio>
        <Radio error value="3">Radio 3</Radio>
      </FieldGroup>
      <span class="ui-end-text" id="radio-group-error"
        >Something went wrong!</span
      >
    </FieldSet>
  </Form>
</template>
