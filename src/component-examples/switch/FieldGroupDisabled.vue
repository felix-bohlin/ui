<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset disabled>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="switch-group-disabled" orientation="horizontal">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>One by one</FieldLegend>
      <FieldGroup name="switch-group-disabled-single" orientation="horizontal">
        <Switch checked>Enabled</Switch>
        <Switch disabled>Disabled</Switch>
        <Switch aria-disabled="true">Aria-disabled</Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
