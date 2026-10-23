<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>These are required!</FieldLegend>
      <FieldGroup orientation="horizontal" name="checkbox-group-required">
        <Checkbox required>Checkbox 1</Checkbox>
        <Checkbox required>Checkbox 2</Checkbox>
        <Checkbox required>Checkbox 3</Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
