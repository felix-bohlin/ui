<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet data-invalid>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="radio-group-validation">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
      <span class="ui-end-text">Something went wrong!</span>
    </FieldSet>
  </Form>
</template>
