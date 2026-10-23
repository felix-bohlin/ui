<script setup lang="ts">
import { Chip } from "opui-css/vue"
</script>

<template>
  <Chip severity="critical" label="Past due" />
  <Chip severity="info" label="Processing" />
  <Chip severity="neutral" label="Refunded" />
  <Chip severity="success" label="Paid" />
  <Chip severity="warning" label="Due 15 Oct" />
</template>
