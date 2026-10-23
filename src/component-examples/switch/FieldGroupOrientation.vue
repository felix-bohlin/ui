<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup name="switch-group-orientation" orientation="horizontal">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
