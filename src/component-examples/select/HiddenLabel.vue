<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select hideLabel label="Sort by">
    <option>Newest first</option>
    <option>Oldest first</option>
    <option>Price, low to high</option>
    <option>Price, high to low</option>
  </Select>
</template>
