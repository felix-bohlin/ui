<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip color="critical" label="Past due" />
  <Chip color="info" label="Processing" />
  <Chip color="neutral" label="Refunded" />
  <Chip color="success" label="Paid" />
  <Chip color="warning" label="Due 15 Oct" />
</template>
