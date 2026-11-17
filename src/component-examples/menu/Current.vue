<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"
</script>

<template>
  <Button
    command="toggle-popover"
    commandfor="menu-current-1"
    variant="outlined"
  >
    Language
  </Button>
  <Menu
    id="menu-current-1"
    :items="[
      { 'aria-current': 'true', label: 'English', lang: 'en' },
      { label: 'Svenska', lang: 'sv' },
      { label: 'Deutsch', lang: 'de' },
    ]"
  />
</template>
