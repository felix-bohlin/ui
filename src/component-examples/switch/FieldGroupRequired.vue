<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>These are required!</FieldLegend>
      <FieldGroup direction="row" name="switch-group-required-astro">
        <Switch required>Switch 1</Switch>
        <Switch required>Switch 2</Switch>
        <Switch required>Switch 3</Switch>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
