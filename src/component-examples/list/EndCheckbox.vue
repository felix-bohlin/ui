<script setup lang="ts">
import { CheckboxInput, List, ListItem } from "opui-css/vue"
</script>

<template>
  <List>
    <ListItem type="checkbox">
      <template #label>Email notifications</template>
      <template #end>
        <CheckboxInput />
      </template>
    </ListItem>
    <ListItem type="checkbox">
      <template #label>Push notifications</template>
      <template #end>
        <CheckboxInput />
      </template>
    </ListItem>
  </List>
</template>
