<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-validation">
        <Checkbox checked error>Checkbox 1</Checkbox>
        <Checkbox error>Checkbox 2</Checkbox>
        <Checkbox error>Checkbox 3</Checkbox>
      </FieldGroup>
      <span class="ui-end-text">Something went wrong!</span>
    </FieldSet>
  </Form>
</template>
