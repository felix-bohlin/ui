<script setup lang="ts">
import { Button, ButtonGroup } from "opui-css/vue"
</script>

<template>
  <ButtonGroup variant="outlined" style="max-inline-size: 18rem">
    <Button>Archive</Button>
    <Button>Move to folder</Button>
    <Button>Mark as unread</Button>
    <Button>Delete</Button>
  </ButtonGroup>
  <ButtonGroup
    variant="outlined"
    overflow="scroll"
    style="max-inline-size: 18rem"
  >
    <Button>Archive</Button>
    <Button>Move to folder</Button>
    <Button>Mark as unread</Button>
    <Button>Delete</Button>
  </ButtonGroup>
  <ButtonGroup
    variant="outlined"
    overflow="shrink"
    style="max-inline-size: 18rem"
  >
    <Button>Archive</Button>
    <Button>Move to folder</Button>
    <Button>Mark as unread</Button>
    <Button>Delete</Button>
  </ButtonGroup>
</template>
