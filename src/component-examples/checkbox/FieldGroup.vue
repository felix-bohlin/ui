<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup>
        <Checkbox checked name="checkbox-group">Email</Checkbox>
        <Checkbox name="checkbox-group">Push</Checkbox>
        <Checkbox name="checkbox-group">SMS</Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
