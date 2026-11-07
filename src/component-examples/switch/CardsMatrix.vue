<script setup lang="ts">
import { Switch, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Input at the end</FieldLegend>
      <FieldGroup name="switch-cards-end" orientation="horizontal">
        <Switch card checked spread value="outlined">
          Outlined
          <template #end-text>The default surface.</template>
        </Switch>
        <Switch card spread value="tonal" variant="tonal">
          Tonal
          <template #end-text>A tinted surface.</template>
        </Switch>
        <Switch card spread value="elevated" variant="elevated">
          Elevated
          <template #end-text>A raised surface.</template>
        </Switch>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Input at the start</FieldLegend>
      <FieldGroup name="switch-cards-start" orientation="horizontal">
        <Switch card checked value="outlined">
          Outlined
          <template #end-text>The default surface.</template>
        </Switch>
        <Switch card value="tonal" variant="tonal">
          Tonal
          <template #end-text>A tinted surface.</template>
        </Switch>
        <Switch card value="elevated" variant="elevated">
          Elevated
          <template #end-text>A raised surface.</template>
        </Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
