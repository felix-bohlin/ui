<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem choice="checkbox">
      <template #label>Email notifications</template>
      <template #end>
        <CheckboxInput />
      </template>
    </ListItem>
    <ListItem choice="checkbox">
      <template #label>Push notifications</template>
      <template #end>
        <CheckboxInput />
      </template>
    </ListItem>
  </List>
</template>
