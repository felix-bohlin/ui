<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, FieldSet, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="checkbox-group-direction-astro">
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
