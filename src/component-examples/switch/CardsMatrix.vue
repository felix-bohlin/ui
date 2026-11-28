<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Switch card checked name="switch-cards-end" spread value="email">
          Email
          <template #end-text>A summary every morning.</template>
        </Switch>
        <Switch
          card
          name="switch-cards-end"
          spread
          value="push"
          variant="elevated"
        >
          Push
          <template #end-text>On this device only.</template>
        </Switch>
        <Switch card name="switch-cards-end" spread value="sms" variant="tonal">
          SMS
          <template #end-text>For security alerts only.</template>
        </Switch>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Privacy</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Switch card checked name="switch-cards-start" value="status">
          Online status
          <template #end-text>Others see when you're active.</template>
        </Switch>
        <Switch
          card
          name="switch-cards-start"
          value="receipts"
          variant="elevated"
        >
          Read receipts
          <template #end-text>Others see when you've read a message.</template>
        </Switch>
        <Switch card name="switch-cards-start" value="search" variant="tonal">
          Profile search
          <template #end-text>People can find you by email.</template>
        </Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
