<script setup lang="ts">
import { Switch } from "opui-css/vue"
</script>

<template>
  <Switch name="switch-visible-label" value="dark-mode">Dark mode</Switch>
  <Switch disabled name="switch-visible-label" value="mobile-data"
    >Sync over mobile data</Switch
  >
  <Switch name="switch-visible-label" value="auto-download">
    Download new episodes automatically while the device is on Wi-Fi and
    charging, and remove played episodes after 24 hours.
  </Switch>
</template>
