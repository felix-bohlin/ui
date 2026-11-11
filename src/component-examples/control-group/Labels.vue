<script setup lang="ts">
import { Button, ControlGroup, TextField } from "opui-css/vue"
</script>

<template>
  <ControlGroup aria-label="Discount" variant="outlined">
    <TextField
      aria-describedby="control-group-labels-1"
      label="Discount code"
      name="discount"
      value="SPRING10"
    />
    <Button>Apply</Button>
  </ControlGroup>
  <p id="control-group-labels-1">One code per order.</p>
</template>
