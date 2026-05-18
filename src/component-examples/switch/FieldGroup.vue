<script setup lang="ts">
import { FieldGroup, FieldLegend, FieldSet, Form, Switch } from "opui-css/vue"
</script>

<template>
<Form as="div">
  <FieldSet>
    <FieldLegend>Legend</FieldLegend>
    <FieldGroup name="switch-group-astro">
      <Switch>Switch 1</Switch>
      <Switch>Switch 2</Switch>
      <Switch>Switch 3</Switch>
    </FieldGroup>
  </FieldSet>
</Form>
</template>
