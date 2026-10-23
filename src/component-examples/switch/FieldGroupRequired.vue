<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <FieldSet>
      <FieldLegend>These are required!</FieldLegend>
      <FieldGroup orientation="horizontal" name="switch-group-required">
        <Switch required>Switch 1</Switch>
        <Switch required>Switch 2</Switch>
        <Switch required>Switch 3</Switch>
      </FieldGroup>
    </FieldSet>
  </Form>
</template>
