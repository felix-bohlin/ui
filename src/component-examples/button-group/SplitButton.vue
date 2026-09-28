<script setup lang="ts">
import { Button, ButtonGroup, Menu } from "opui-css/vue"
</script>

<template>
  <ButtonGroup variant="outlined">
    <Button>Save</Button>
    <Button
      aria-label="More save options"
      commandfor="split-button-menu"
      command="toggle-popover"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M5.293 11.293a1 1 0 0 1 1.414 0L16 20.586l9.293-9.293a1 1 0 1 1 1.414 1.414l-10 10a1 1 0 0 1-1.414 0l-10-10a1 1 0 0 1 0-1.414"
        ></path>
      </svg>
    </Button>
    <Menu
      id="split-button-menu"
      align="end"
      :items="[{ label: 'Save as draft' }, { label: 'Save and publish' }]"
    />
  </ButtonGroup>
</template>
