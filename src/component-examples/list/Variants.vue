<script setup lang="ts">
import { List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem label="Account" />
    <ListItem label="Billing" />
  </List>

  <List variant="tonal">
    <ListItem label="Language" />
    <ListItem label="Notifications" />
  </List>

  <List variant="transparent">
    <ListItem label="Accessibility" />
    <ListItem label="Privacy" />
  </List>
</template>
