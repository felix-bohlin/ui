<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select label="Role">
    <option value="">-</option>
    <option>Designer</option>
    <option>Developer</option>
    <option>Manager</option>
  </Select>

  <Select label="Team" variant="filled">
    <option value="">-</option>
    <option>Design</option>
    <option>Engineering</option>
    <option>Sales</option>
  </Select>
</template>
