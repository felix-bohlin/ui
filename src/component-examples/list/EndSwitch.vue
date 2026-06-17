<script setup lang="ts">
import { List, ListItem, SwitchInput } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem type="switch" for="switch-example-1">
      <template #text><div>Switch 1</div></template>
      <template #end><SwitchInput id="switch-example-1" /></template>
    </ListItem>
    <ListItem type="switch" for="switch-example-2">
      <template #text><div>Switch 2</div></template>
      <template #end><SwitchInput id="switch-example-2" /></template>
    </ListItem>
  </List>
</template>
