<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"
</script>

<template>
  <Button commandfor="menu-manual" command="toggle-popover" variant="outlined">
    View
  </Button>
  <Menu
    id="menu-manual"
    popover="manual"
    :items="[
      { text: 'Show grid', closeOnClick: false },
      { text: 'Show rulers', closeOnClick: false },
      { text: 'Done', borderTop: true },
    ]"
  />
</template>
