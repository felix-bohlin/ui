<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset disabled>
      <FieldLegend>Share with friends</FieldLegend>
      <FieldGroup name="switch-group-disabled" orientation="horizontal">
        <Switch value="profile">Profile</Switch>
        <Switch value="activity">Activity</Switch>
        <Switch value="location">Location</Switch>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Sync</FieldLegend>
      <FieldGroup name="switch-group-disabled-single" orientation="horizontal">
        <Switch checked value="contacts">Contacts</Switch>
        <Switch disabled value="photos">Photos</Switch>
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
