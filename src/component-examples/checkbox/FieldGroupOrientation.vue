<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Toppings</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Checkbox checked name="checkbox-group-orientation">Cheese</Checkbox>
        <Checkbox name="checkbox-group-orientation">Mushrooms</Checkbox>
        <Checkbox name="checkbox-group-orientation">Olives</Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
