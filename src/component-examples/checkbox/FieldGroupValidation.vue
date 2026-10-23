<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset aria-describedby="checkbox-field-group-validation-1-error">
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup orientation="horizontal" name="checkbox-group-validation">
        <Checkbox checked error>Checkbox 1</Checkbox>
        <Checkbox error>Checkbox 2</Checkbox>
        <Checkbox error>Checkbox 3</Checkbox>
      </FieldGroup>
      <span class="ui-end-text" id="checkbox-field-group-validation-1-error"
        >Something went wrong!</span
      >
    </Fieldset>
  </Form>
</template>
