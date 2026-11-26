<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup name="switch-group">
        <Switch value="email">Email</Switch>
        <Switch value="push">Push</Switch>
        <Switch value="sms">SMS</Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
