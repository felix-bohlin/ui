<script setup lang="ts">
import { Button, ControlGroup } from "opui-css/vue"
</script>

<template>
  <ControlGroup aria-label="Edit history">
    <Button>Undo</Button>
    <Button>Redo</Button>
    <Button href="#">History</Button>
  </ControlGroup>

  <ControlGroup aria-label="Edit history" variant="outlined">
    <Button>Undo</Button>
    <Button>Redo</Button>
    <Button href="#">History</Button>
  </ControlGroup>

  <ControlGroup aria-label="Edit history" variant="tonal">
    <Button>Undo</Button>
    <Button>Redo</Button>
    <Button href="#">History</Button>
  </ControlGroup>

  <ControlGroup aria-label="Edit history" variant="filled">
    <Button>Undo</Button>
    <Button>Redo</Button>
    <Button href="#">History</Button>
  </ControlGroup>
</template>
