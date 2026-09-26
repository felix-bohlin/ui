<script setup lang="ts">
import { IconButton, ListItem, Menu } from "opui-css/vue"
</script>

<template>
  <IconButton
    aria-label="More actions"
    commandfor="menu-custom"
    command="toggle-popover"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
      ></path>
    </svg>
  </IconButton>
  <Menu id="menu-custom">
    <li class="ui-label">Document</li>
    <ListItem as="button" commandfor="menu-custom" command="hide-popover">
      <template #start>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
          ></path>
        </svg>
      </template>
      Rename
      <template #end><kbd>F2</kbd></template>
    </ListItem>
    <ListItem as="button" commandfor="menu-custom" command="hide-popover">
      <template #start>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m0 16H8V7h11z"
          ></path>
        </svg>
      </template>
      Copy
      <template #end><kbd>Ctrl C</kbd></template>
    </ListItem>
    <ListItem as="a" href="#menu">
      <template #start>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"
          ></path>
        </svg>
      </template>
      Open in new tab
    </ListItem>
    <ListItem
      as="button"
      border-top
      class="ui-critical"
      commandfor="menu-custom"
      command="hide-popover"
    >
      <template #start>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
          ></path>
        </svg>
      </template>
      Delete
    </ListItem>
  </Menu>
</template>
