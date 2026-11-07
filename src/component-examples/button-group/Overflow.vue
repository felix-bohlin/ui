<script setup lang="ts">
import { Button, ButtonGroup } from "opui-css/vue"
</script>

<template>
  <ButtonGroup style="max-inline-size: 18rem" variant="outlined">
    <Button>Archive</Button>
    <Button>Move to folder</Button>
    <Button>Mark as unread</Button>
    <Button>Delete</Button>
  </ButtonGroup>
  <ButtonGroup
    overflow="scroll"
    style="max-inline-size: 18rem"
    variant="outlined"
  >
    <Button>Archive</Button>
    <Button>Move to folder</Button>
    <Button>Mark as unread</Button>
    <Button>Delete</Button>
  </ButtonGroup>
  <ButtonGroup
    overflow="shrink"
    style="max-inline-size: 18rem"
    variant="outlined"
  >
    <Button>Archive</Button>
    <Button>Move to folder</Button>
    <Button>Mark as unread</Button>
    <Button>Delete</Button>
  </ButtonGroup>
</template>
