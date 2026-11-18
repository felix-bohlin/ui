<script setup lang="ts">
import { Checkbox, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Checkbox>Email</Checkbox>
        <Checkbox>Push</Checkbox>
        <Checkbox>SMS</Checkbox>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
