<script setup lang="ts">
import { Button, Menu } from "opui-css/vue"

const formats = ["PDF", "PNG", "SVG"].map((label) => ({
  commandfor: "menu-file",
  label,
}))
</script>

<template>
  <Button commandfor="menu-file" command="toggle-popover" variant="outlined">
    File
  </Button>
  <Menu id="menu-file" :items="[{ label: 'New' }, { label: 'Open' }]">
    <li>
      <button type="button" commandfor="menu-export" command="toggle-popover">
        Export
        <span class="ui-end" aria-hidden="true">▸</span>
      </button>
      <Menu id="menu-export" :items="formats" placement="inline-end" />
    </li>
  </Menu>
</template>
