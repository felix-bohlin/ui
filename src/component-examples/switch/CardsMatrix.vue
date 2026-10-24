<script setup lang="ts">
import { Switch, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Input at the end</FieldLegend>
      <FieldGroup name="switch-cards-end" orientation="horizontal">
        <Switch value="outlined" checked card spread>
          Outlined
          <template #end-text>The default surface.</template>
        </Switch>
        <Switch value="tonal" card variant="tonal" spread>
          Tonal
          <template #end-text>A tinted surface.</template>
        </Switch>
        <Switch value="elevated" card variant="elevated" spread>
          Elevated
          <template #end-text>A raised surface.</template>
        </Switch>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Input at the start</FieldLegend>
      <FieldGroup name="switch-cards-start" orientation="horizontal">
        <Switch value="outlined" checked card>
          Outlined
          <template #end-text>The default surface.</template>
        </Switch>
        <Switch value="tonal" card variant="tonal">
          Tonal
          <template #end-text>A tinted surface.</template>
        </Switch>
        <Switch value="elevated" card variant="elevated">
          Elevated
          <template #end-text>A raised surface.</template>
        </Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
