<script setup lang="ts">
import { Button, ControlGroup } from "opui-css/vue"
</script>

<template>
  <div class="ui-layout-column ui-large">
    <ControlGroup
      aria-label="Message actions"
      style="max-inline-size: 18rem"
      variant="outlined"
    >
      <Button>Archive</Button>
      <Button>Move to folder</Button>
      <Button>Mark as unread</Button>
      <Button>Delete</Button>
    </ControlGroup>
    <ControlGroup
      aria-label="Message actions"
      overflow="scroll"
      style="max-inline-size: 18rem"
      variant="outlined"
    >
      <Button>Archive</Button>
      <Button>Move to folder</Button>
      <Button>Mark as unread</Button>
      <Button>Delete</Button>
    </ControlGroup>
    <ControlGroup
      aria-label="Message actions"
      overflow="shrink"
      style="max-inline-size: 18rem"
      variant="outlined"
    >
      <Button>Archive</Button>
      <Button>Move to folder</Button>
      <Button>Mark as unread</Button>
      <Button>Delete</Button>
    </ControlGroup>
  </div>
</template>
