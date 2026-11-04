<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"
</script>

<template>
  <Button
    command="toggle-popover"
    commandfor="menu-bordered-1"
    variant="outlined"
  >
    Options
  </Button>
  <Menu
    bordered
    id="menu-bordered-1"
    :items="[{ label: 'Edit' }, { label: 'Duplicate' }, { label: 'Archive' }]"
  />
</template>
