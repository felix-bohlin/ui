<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"
</script>

<template>
  <Button commandfor="menu-basics" command="toggle-popover" variant="outlined">
    Options
  </Button>
  <Menu
    id="menu-basics"
    :items="[
      { label: 'Edit', shortcut: 'E' },
      { label: 'Duplicate', shortcut: 'D' },
      { label: 'Archive', disabled: true },
      { label: 'Delete', borderTop: true, critical: true },
    ]"
  />
</template>
