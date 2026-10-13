<script setup lang="ts">
import { Checkbox } from "opui-css/vue"
</script>

<template>
  <Checkbox checked name="checkbox-visible-label">Choice A</Checkbox>
  <Checkbox disabled name="checkbox-visible-label">Disabled</Checkbox>
  <Checkbox checked disabled name="checkbox-visible-label"
    >Checked and disabled</Checkbox
  >
  <Checkbox name="checkbox-visible-label">
    Long text dolor amet mustache knausgaard +1, blue bottle waistcoat tbh
    semiotics artisan synth stumptown gastropub cornhole
    <a class="ui-link" href="#visible-label">privacy policy ipsum</a>
  </Checkbox>
</template>
