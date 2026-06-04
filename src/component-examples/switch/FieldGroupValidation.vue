<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet data-invalid>
      <FieldLegend>Legend</FieldLegend>
      <FieldGroup direction="row" name="switch-group-validation-astro">
        <Switch>Switch 1</Switch>
        <Switch>Switch 2</Switch>
        <Switch>Switch 3</Switch>
      </FieldGroup>
      <span class="end-text">Something went wrong!</span>
    </FieldSet>
  </Form>
</template>
