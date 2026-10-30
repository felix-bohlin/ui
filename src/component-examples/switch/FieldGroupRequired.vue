<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>These are required!</FieldLegend>
      <FieldGroup name="switch-group-required" orientation="horizontal">
        <Switch required>Switch 1</Switch>
        <Switch required>Switch 2</Switch>
        <Switch required>Switch 3</Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
