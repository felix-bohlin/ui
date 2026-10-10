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
      { label: 'Show grid', closeOnClick: false },
      { label: 'Show rulers', closeOnClick: false },
      { label: 'Done', borderTop: true },
    ]"
  />
</template>
