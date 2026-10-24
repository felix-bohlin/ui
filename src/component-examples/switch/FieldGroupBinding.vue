<script setup lang="ts">
import { ref } from "vue"
import { Button, FieldGroup, FieldLegend, Fieldset, Switch } from "opui-css/vue"

const notifications = ref(["email"])

function reset() {
  notifications.value = ["email"]
}
</script>

<template>
  <Fieldset>
    <FieldLegend>Notifications</FieldLegend>
    <FieldGroup name="switch-binding">
      <Switch v-model="notifications" value="email">Email</Switch>
      <Switch v-model="notifications" value="push">Push</Switch>
      <Switch v-model="notifications" value="sms">SMS</Switch>
    </FieldGroup>
  </Fieldset>
  <p class="switch-binding-text">
    Selected: {{ notifications.join(", ") || "none" }}
  </p>
  <Button class="switch-binding-reset" @click="reset">Reset</Button>
</template>
