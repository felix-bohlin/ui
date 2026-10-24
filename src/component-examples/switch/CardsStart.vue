<script setup lang="ts">
import { Switch, FieldGroup, FieldLegend, Fieldset, Form } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup name="switch-cards-start">
        <Switch value="email" checked card>
          Email
          <template #end-text>A summary of each day.</template>
        </Switch>
        <Switch value="push" card>
          Push
          <template #end-text>Right when something happens.</template>
        </Switch>
        <Switch value="digest" card>
          Weekly digest
          <template #end-text>Every Monday morning.</template>
        </Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
