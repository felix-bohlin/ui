<script setup lang="ts">
import { ref } from "vue"
import { Button, FieldGroup, FieldLegend, FieldSet, Switch } from "opui-css/vue"

const notifications = ref(["email"])

function reset() {
  notifications.value = ["email"]
}
</script>

<template>
  <FieldSet>
    <FieldLegend>Notifications</FieldLegend>
    <FieldGroup name="switch-binding">
      <Switch v-model="notifications" value="email">Email</Switch>
      <Switch v-model="notifications" value="push">Push</Switch>
      <Switch v-model="notifications" value="sms">SMS</Switch>
    </FieldGroup>
  </FieldSet>
  <p class="switch-binding-text">
    Selected: {{ notifications.join(", ") || "none" }}
  </p>
  <Button class="switch-binding-reset" @click="reset">Reset</Button>
</template>
