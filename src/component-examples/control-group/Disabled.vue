<script setup lang="ts">
import { Button, ControlGroup } from "opui-css/vue"
</script>

<template>
  <ControlGroup variant="filled">
    <Button>Enabled</Button>
    <Button disabled>Disabled</Button>
    <Button>Enabled</Button>
  </ControlGroup>

  <ControlGroup color="primary" variant="filled">
    <Button>Enabled</Button>
    <Button disabled>Disabled</Button>
    <Button>Enabled</Button>
  </ControlGroup>
</template>
