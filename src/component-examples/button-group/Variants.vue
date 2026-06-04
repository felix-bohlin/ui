<script setup lang="ts">
import { Button, ButtonGroup } from "opui-css/vue"
</script>

<template>
  <ButtonGroup>
    <Button>Text</Button>
    <Button>Text</Button>
    <Button>Text</Button>
  </ButtonGroup>

  <ButtonGroup variant="outlined">
    <Button>Outlined</Button>
    <Button>Outlined</Button>
    <Button>Outlined</Button>
  </ButtonGroup>

  <ButtonGroup variant="tonal">
    <Button>Tonal</Button>
    <Button>Tonal</Button>
    <Button>Tonal</Button>
  </ButtonGroup>

  <ButtonGroup variant="filled">
    <Button>Filled</Button>
    <Button>Filled</Button>
    <Button>Filled</Button>
  </ButtonGroup>
</template>
