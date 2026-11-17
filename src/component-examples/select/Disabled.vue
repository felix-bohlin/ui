<script setup lang="ts">
import { Select } from "opui-css/vue"
</script>

<template>
  <Select disabled label="Plan">
    <option>Gold</option>
    <option>Platinum</option>
  </Select>

  <Select disabled label="Billing cycle" variant="filled">
    <option>Yearly</option>
    <option>Monthly</option>
  </Select>
</template>
