<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"

const items = [{ label: "First" }, { label: "Second" }, { label: "Third" }]
</script>

<template>
  <Button
    command="toggle-popover"
    commandfor="menu-placement-1"
    variant="outlined"
  >
    Block start
  </Button>
  <Menu id="menu-placement-1" :items="items" side="block-start" />

  <Button
    command="toggle-popover"
    commandfor="menu-placement-2"
    variant="outlined"
  >
    Block end
  </Button>
  <Menu id="menu-placement-2" :items="items" />

  <Button
    command="toggle-popover"
    commandfor="menu-placement-3"
    variant="outlined"
  >
    Inline start
  </Button>
  <Menu id="menu-placement-3" :items="items" side="inline-start" />

  <Button
    command="toggle-popover"
    commandfor="menu-placement-4"
    variant="outlined"
  >
    Inline end
  </Button>
  <Menu id="menu-placement-4" :items="items" side="inline-end" />

  <Button
    command="toggle-popover"
    commandfor="menu-placement-5"
    variant="outlined"
  >
    Align end
  </Button>
  <Menu align="end" id="menu-placement-5" :items="items" />
</template>
