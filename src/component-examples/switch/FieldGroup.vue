<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup>
        <Switch name="switch-group" value="email">Email</Switch>
        <Switch name="switch-group" value="push">Push</Switch>
        <Switch name="switch-group" value="sms">SMS</Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
