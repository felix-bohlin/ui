<script setup lang="ts">
import { Button, ListItem, Menu } from "opui-css/vue"
</script>

<template>
  <Button
    command="toggle-popover"
    commandfor="menu-custom-check-1"
    variant="outlined"
  >
    Theme
  </Button>
  <Menu
    id="menu-custom-check-1"
    :items="[
      { label: 'Light' },
      { 'aria-current': 'true', label: 'Dark' },
      { label: 'System' },
    ]"
  >
    <template #icon-checked>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    </template>
  </Menu>

  <Button
    command="toggle-popover"
    commandfor="menu-custom-check-2"
    variant="outlined"
  >
    Sort by
  </Button>
  <Menu id="menu-custom-check-2">
    <ListItem
      aria-current="true"
      as="button"
      command="hide-popover"
      commandfor="menu-custom-check-2"
      label="Name"
    >
      <template #icon-checked>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      </template>
    </ListItem>
    <ListItem
      as="button"
      command="hide-popover"
      commandfor="menu-custom-check-2"
      label="Date modified"
    >
      <template #icon-checked>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
      </template>
    </ListItem>
  </Menu>
</template>
