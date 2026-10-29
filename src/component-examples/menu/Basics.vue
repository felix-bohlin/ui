<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"
</script>

<template>
  <Button
    commandfor="menu-basics-1"
    command="toggle-popover"
    variant="outlined"
  >
    Options
  </Button>
  <Menu
    id="menu-basics-1"
    :items="[
      { label: 'Edit', shortcut: 'Ctrl+E' },
      { label: 'Duplicate', shortcut: 'Ctrl+D' },
      { disabled: true, label: 'Archive' },
      { href: '/guide/getting-started/', label: 'Help' },
      { borderTop: true, color: 'critical', label: 'Delete' },
    ]"
  />
</template>
