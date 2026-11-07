<script setup lang="ts">
import { List, ListItem, SwitchInput } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem type="switch">
      <template #label>Bluetooth</template>
      <template #end>
        <SwitchInput />
      </template>
    </ListItem>
    <ListItem type="switch">
      <template #label>Wi-Fi</template>
      <template #end>
        <SwitchInput />
      </template>
    </ListItem>
  </List>
</template>
