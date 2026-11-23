<script setup lang="ts">
import { List } from "opui-css/vue"
import ListAll from "./ListAll.vue"
</script>

<template>
  <List dense class="list-dense-target">
    <ListAll prefix="dense-" />
  </List>
</template>
