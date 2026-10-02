<script setup lang="ts">
import { Button, ListItem, Menu } from "opui-css/vue"

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
    <ListItem as="button" commandfor="menu-export" command="toggle-popover">
      Export
      <template #end>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M8.293 4.293a1 1 0 0 0 0 1.414L14.586 12l-6.293 6.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414l-7-7a1 1 0 0 0-1.414 0"
          ></path>
        </svg>
      </template>
      <template #submenu>
        <Menu id="menu-export" :items="formats" placement="inline-end" />
      </template>
    </ListItem>
  </Menu>
</template>
