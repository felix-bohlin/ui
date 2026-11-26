<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Show in toolbar</FieldLegend>
      <FieldGroup name="switch-group-orientation" orientation="horizontal">
        <Switch value="bold">Bold</Switch>
        <Switch value="italic">Italic</Switch>
        <Switch value="underline">Underline</Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
