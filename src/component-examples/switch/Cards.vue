<script setup lang="ts">
import { Switch, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup name="switch-cards">
        <Switch value="email" checked card spread>
          Email
          <template #end-text>A summary of each day.</template>
        </Switch>
        <Switch value="push" card spread>
          Push
          <template #end-text>Right when something happens.</template>
        </Switch>
        <Switch value="digest" card spread>
          Weekly digest
          <template #end-text>Every Monday morning.</template>
        </Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
