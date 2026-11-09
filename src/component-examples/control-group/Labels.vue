<script setup lang="ts">
import { Button, ControlGroup, TextField } from "opui-css/vue"
</script>

<template>
  <ControlGroup variant="outlined">
    <TextField label="Discount code" name="discount" value="SPRING10" />
    <Button>Apply</Button>
  </ControlGroup>
</template>
