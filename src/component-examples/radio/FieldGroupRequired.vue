<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Radio } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Account type</FieldLegend>
      <FieldGroup name="radio-group-required" orientation="horizontal">
        <Radio required value="personal">Personal</Radio>
        <Radio required value="business">Business</Radio>
        <Radio required value="nonprofit">Nonprofit</Radio>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
