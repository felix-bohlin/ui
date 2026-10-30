<script setup lang="ts">
import {
  Checkbox,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  Fieldset,
  Form,
} from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Legend</FieldLegend>
      <FieldDescription>Field description above fields</FieldDescription>
      <FieldGroup
        name="checkbox-group-field-description-1"
        orientation="horizontal"
      >
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
    </Fieldset>

    <Fieldset>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup
        name="checkbox-group-field-description-2"
        orientation="horizontal"
      >
        <Checkbox checked>Checkbox 1</Checkbox>
        <Checkbox>Checkbox 2</Checkbox>
        <Checkbox>Checkbox 3</Checkbox>
      </FieldGroup>
      <FieldDescription>Field description below fields</FieldDescription>
    </Fieldset>
  </Form>
</template>
