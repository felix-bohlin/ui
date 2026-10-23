<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset aria-describedby="switch-field-group-validation-1-error">
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup orientation="horizontal" name="switch-field-group-validation">
        <Switch error>Switch 1</Switch>
        <Switch error>Switch 2</Switch>
        <Switch error>Switch 3</Switch>
      </FieldGroup>
      <span class="ui-end-text" id="switch-field-group-validation-1-error"
        >Something went wrong!</span
      >
    </Fieldset>
  </Form>
</template>
