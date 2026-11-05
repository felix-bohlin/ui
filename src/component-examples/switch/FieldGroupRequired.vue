<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset>
      <FieldLegend>Admin security</FieldLegend>
      <FieldGroup name="switch-group-required" orientation="horizontal">
        <Switch required value="two-step-login">Two-step login</Switch>
        <Switch required value="login-alerts">Login alerts</Switch>
        <Switch required value="auto-lock">Auto-lock</Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
