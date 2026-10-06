<script setup lang="ts">
import { List } from "opui-css/vue"
import ListAll from "./partials/ListAll.vue"
</script>

<template>
  <List dense>
    <ListAll prefix="dense-" />
  </List>
</template>
