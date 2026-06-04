<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox checked name="checkbox">Choice A</Checkbox>
  <Checkbox disabled name="checkbox">Disabled</Checkbox>
  <Checkbox checked disabled name="checkbox">Checked and disabled</Checkbox>
  <Checkbox name="checkbox">
    <span class="label"
      >Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
      semiotics artisan synth stumptown gastropub cornhole
      <a class="ui-link" href="#visible-label">privacy policy ipsum</a></span
    >
  </Checkbox>
</template>
