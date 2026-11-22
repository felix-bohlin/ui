<script setup lang="ts">
import { Meter } from "opui-css/vue"
</script>

<template>
  <Meter aria-label="Seats taken" max="40" value="10" variant="filled" />
  <Meter aria-label="Tickets sold" max="40" value="30" variant="tonal" />
</template>
