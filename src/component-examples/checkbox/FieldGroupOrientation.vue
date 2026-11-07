<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Toppings</FieldLegend>
      <FieldGroup name="checkbox-group-orientation" orientation="horizontal">
        <Checkbox checked>Cheese</Checkbox>
        <Checkbox>Mushrooms</Checkbox>
        <Checkbox>Olives</Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
