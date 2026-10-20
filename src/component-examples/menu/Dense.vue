<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"
</script>

<template>
  <Button commandfor="menu-dense-1" command="toggle-popover" variant="outlined">
    Options
  </Button>
  <Menu
    dense
    id="menu-dense-1"
    :items="[{ text: 'Copy' }, { text: 'Cut' }, { text: 'Paste' }]"
  />
</template>
