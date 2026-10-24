<script setup lang="ts">
import { Switch, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Variants</FieldLegend>
      <FieldGroup name="switch-cards-variants" orientation="horizontal">
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
  </Form>
</template>
