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
      { text: 'Edit', shortcut: 'E' },
      { text: 'Duplicate', shortcut: 'D' },
      { text: 'Archive', disabled: true },
      { text: 'Delete', borderTop: true, critical: true },
    ]"
  />
</template>
