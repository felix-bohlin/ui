<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"
</script>

<template>
  <Button
    commandfor="menu-bordered"
    command="toggle-popover"
    variant="outlined"
  >
    Options
  </Button>
  <Menu
    bordered
    id="menu-bordered"
    :items="[{ label: 'Edit' }, { label: 'Duplicate' }, { label: 'Archive' }]"
  />
</template>
