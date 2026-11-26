<script setup lang="ts">
import { FieldGroup, FieldLegend, Fieldset, Form, Switch } from "opui-css/vue"
</script>

<template>
  <Form>
    <Fieldset disabled>
      <FieldLegend>Share with friends</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Switch name="switch-group-disabled" value="profile">Profile</Switch>
        <Switch name="switch-group-disabled" value="activity">Activity</Switch>
        <Switch name="switch-group-disabled" value="location">Location</Switch>
      </FieldGroup>
    </Fieldset>
    <Fieldset>
      <FieldLegend>Sync</FieldLegend>
      <FieldGroup orientation="horizontal">
        <Switch checked name="switch-group-disabled-single" value="contacts"
          >Contacts</Switch
        >
        <Switch disabled name="switch-group-disabled-single" value="photos"
          >Photos</Switch
        >
      </FieldGroup>
    </Fieldset>
  </Form>
</template>
