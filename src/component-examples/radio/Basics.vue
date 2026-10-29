<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="radio-group">
        <Radio value="1" checked>Radio 1</Radio>
        <Radio value="2">Radio 2</Radio>
        <Radio value="3">Radio 3</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
