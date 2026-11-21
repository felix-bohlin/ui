<script setup lang="ts">
import { computed, ref } from "vue"
import { Button, FieldGroup, FieldLegend, Fieldset, Switch } from "opui-css/vue"

const channels = ["email", "push", "sms"]

const notifications = ref(["email"])
const summary = computed(
  () =>
    channels
      .filter((channel) => notifications.value.includes(channel))
      .join(", ") || "none",
)

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
  <p class="switch-binding-text">Selected: {{ summary }}</p>
  <Button class="switch-binding-reset" @click="reset">Reset</Button>
</template>
