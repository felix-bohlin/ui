<script setup lang="ts">
import { Button } from "opui-css/vue"
</script>

<template>
  <div class="example-row">
    <Button>Transparent</Button>
    <Button disabled>Disabled</Button>
    <Button href="#">Link</Button>
    <Button aria-current="page" href="#">Current</Button>
  </div>
  <div class="example-row">
    <Button variant="outlined">Outlined</Button>
    <Button disabled variant="outlined">Disabled</Button>
    <Button href="#" variant="outlined">Link</Button>
  </div>
  <div class="example-row">
    <Button variant="tonal">Tonal</Button>
    <Button disabled variant="tonal">Disabled</Button>
    <Button href="#" variant="tonal">Link</Button>
  </div>
  <div class="example-row">
    <Button variant="filled">Filled</Button>
    <Button disabled variant="filled">Disabled</Button>
    <Button href="#" variant="filled">Link</Button>
  </div>
</template>
