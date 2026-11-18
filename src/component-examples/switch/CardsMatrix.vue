<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup name="switch-cards-end" orientation="horizontal">
        <Switch card checked spread value="email">
          Email
          <template #end-text>A summary every morning.</template>
        </Switch>
        <Switch card spread value="push" variant="elevated">
          Push
          <template #end-text>On this device only.</template>
        </Switch>
        <Switch card spread value="sms" variant="tonal">
          SMS
          <template #end-text>For security alerts only.</template>
        </Switch>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Privacy</FieldLegend>
      <FieldGroup name="switch-cards-start" orientation="horizontal">
        <Switch card checked value="status">
          Online status
          <template #end-text>Others see when you're active.</template>
        </Switch>
        <Switch card value="receipts" variant="elevated">
          Read receipts
          <template #end-text>Others see when you've read a message.</template>
        </Switch>
        <Switch card value="search" variant="tonal">
          Profile search
          <template #end-text>People can find you by email.</template>
        </Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
